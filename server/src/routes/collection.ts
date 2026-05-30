import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("Missing required env var: JWT_SECRET");

function getUserId(req: Request): number | null {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET) as any;
    return payload.userId;
  } catch {
    return null;
  }
}

router.get("/", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  try {
    const [rows] = await pool.query("SELECT stamp_id, count, exchanged FROM user_stamps WHERE user_id = ? AND count > 0", [userId]);
    const stamps: Record<string, { count: number; exchanged: number }> = {};
    for (const r of rows as any[]) {
      stamps[r.stamp_id] = { count: r.count, exchanged: r.exchanged };
    }
    res.json({ stamps });
  } catch (e: any) {
    res.status(500).json({ error: "Error al obtener colección" });
  }
});

router.post("/increment", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  const { stampId } = req.body;
  if (!stampId) { res.status(400).json({ error: "stampId requerido" }); return; }

  try {
    await pool.query(
      `INSERT INTO user_stamps (user_id, stamp_id, count) VALUES (?, ?, 1)
       ON DUPLICATE KEY UPDATE count = count + 1`,
      [userId, stampId]
    );
    const [rows] = await pool.query("SELECT count, exchanged FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
    const r = (rows as any[])[0];
    res.json({ stampId, count: r.count, exchanged: r.exchanged });
  } catch (e: any) {
    res.status(500).json({ error: "Error al incrementar" });
  }
});

router.post("/decrement", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  const { stampId } = req.body;
  if (!stampId) { res.status(400).json({ error: "stampId requerido" }); return; }

  try {
    const [existing] = await pool.query("SELECT count FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
    const rows = existing as any[];
    if (rows.length === 0 || rows[0].count <= 1) {
      await pool.query("DELETE FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
      res.json({ stampId, count: 0, exchanged: 0 });
    } else {
      await pool.query("UPDATE user_stamps SET count = count - 1 WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
      const [updated] = await pool.query("SELECT count, exchanged FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
      const r = (updated as any[])[0];
      res.json({ stampId, count: r.count, exchanged: r.exchanged });
    }
  } catch (e: any) {
    res.status(500).json({ error: "Error al decrementar" });
  }
});

router.post("/exchange", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  const { stampId } = req.body;
  if (!stampId) { res.status(400).json({ error: "stampId requerido" }); return; }

  try {
    const [existing] = await pool.query("SELECT count FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
    const rows = existing as any[];
    if (rows.length === 0 || rows[0].count < 1) {
      res.status(400).json({ error: "No tienes esta estampa para intercambiar" }); return;
    }

    await pool.query(
      "UPDATE user_stamps SET count = count - 1, exchanged = exchanged + 1 WHERE user_id = ? AND stamp_id = ?",
      [userId, stampId]
    );
    // Clean up if count reached 0
    await pool.query("DELETE FROM user_stamps WHERE user_id = ? AND stamp_id = ? AND count <= 0 AND exchanged <= 0", [userId, stampId]);
    const [updated] = await pool.query("SELECT count, exchanged FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
    if ((updated as any[]).length === 0) {
      res.json({ stampId, count: 0, exchanged: 0 });
    } else {
      const r = (updated as any[])[0];
      res.json({ stampId, count: r.count, exchanged: r.exchanged });
    }
  } catch (e: any) {
    res.status(500).json({ error: "Error al registrar intercambio" });
  }
});

router.get("/duplicates", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  try {
    const [rows] = await pool.query(
      "SELECT stamp_id, count, exchanged FROM user_stamps WHERE user_id = ? AND count > 1",
      [userId]
    );
    res.json({ duplicates: rows });
  } catch (e: any) {
    res.status(500).json({ error: "Error al obtener repetidas" });
  }
});

router.get("/stats", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as uniqueStamps, COALESCE(SUM(count), 0) as totalCopies, COALESCE(SUM(exchanged), 0) as totalExchanged FROM user_stamps WHERE user_id = ? AND count > 0",
      [userId]
    );
    const r = (rows as any[])[0];
    res.json({ owned: r.uniqueStamps, total: 960, copies: r.totalCopies, exchanged: r.totalExchanged });
  } catch (e: any) {
    res.status(500).json({ error: "Error al obtener stats" });
  }
});

export default router;
