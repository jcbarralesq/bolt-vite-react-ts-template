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
    const [rows] = await pool.query("SELECT stamp_id, owned FROM user_stamps WHERE user_id = ?", [userId]);
    const stamps: Record<string, boolean> = {};
    for (const r of rows as any[]) {
      stamps[r.stamp_id] = r.owned === 1 || r.owned === true;
    }
    res.json({ stamps });
  } catch (e: any) {
    res.status(500).json({ error: "Error al obtener colección" });
  }
});

router.post("/toggle", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  const { stampId } = req.body;
  if (!stampId) { res.status(400).json({ error: "stampId requerido" }); return; }

  try {
    const [existing] = await pool.query("SELECT owned FROM user_stamps WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
    const rows = existing as any[];

    if (rows.length > 0) {
      const newOwned = !rows[0].owned;
      await pool.query("UPDATE user_stamps SET owned = ? WHERE user_id = ? AND stamp_id = ?", [newOwned, userId, stampId]);
      res.json({ stampId, owned: newOwned });
    } else {
      await pool.query("INSERT INTO user_stamps (user_id, stamp_id, owned) VALUES (?, ?, ?)", [userId, stampId, true]);
      res.json({ stampId, owned: true });
    }
  } catch (e: any) {
    res.status(500).json({ error: "Error al actualizar" });
  }
});

router.post("/sync", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  const { stamps } = req.body as { stamps: string[] };
  if (!stamps || !Array.isArray(stamps)) {
    res.status(400).json({ error: "stamps array requerido" }); return;
  }

  try {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query("DELETE FROM user_stamps WHERE user_id = ?", [userId]);
      if (stamps.length > 0) {
        const values = stamps.map(s => [userId, s, true]);
        await conn.query("INSERT INTO user_stamps (user_id, stamp_id, owned) VALUES ?", [values]);
      }
      await conn.commit();
      res.json({ ok: true, count: stamps.length });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (e: any) {
    res.status(500).json({ error: "Error al sincronizar" });
  }
});

router.get("/stats", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }

  try {
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM user_stamps WHERE user_id = ? AND owned = true", [userId]);
    const count = (rows as any[])[0].count;
    res.json({ owned: count, total: 960 });
  } catch (e: any) {
    res.status(500).json({ error: "Error al obtener stats" });
  }
});

export default router;
