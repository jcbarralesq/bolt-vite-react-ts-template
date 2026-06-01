import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request): number | null {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;
  try { const p = jwt.verify(auth.slice(7), JWT_SECRET) as any; return p.userId; } catch { return null; }
}

router.get("/", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }
  try {
    const [rows] = await pool.query("SELECT stamp_id FROM user_wishlist WHERE user_id = ?", [userId]);
    res.json({ stamps: (rows as any[]).map(r => r.stamp_id) });
  } catch (e) { res.status(500).json({ error: "Error" }); }
});

router.post("/toggle", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }
  const { stampId } = req.body;
  if (!stampId) { res.status(400).json({ error: "stampId requerido" }); return; }
  try {
    const [existing] = await pool.query("SELECT 1 FROM user_wishlist WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
    if ((existing as any[]).length > 0) {
      await pool.query("DELETE FROM user_wishlist WHERE user_id = ? AND stamp_id = ?", [userId, stampId]);
      res.json({ stampId, wishlisted: false });
    } else {
      await pool.query("INSERT INTO user_wishlist (user_id, stamp_id) VALUES (?, ?)", [userId, stampId]);
      res.json({ stampId, wishlisted: true });
    }
  } catch (e) { res.status(500).json({ error: "Error" }); }
});

router.get("/matches", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "No autorizado" }); return; }
  try {
    const [rows] = await pool.query(
      `SELECT w.stamp_id, u.id as user_id, u.username, s.count
       FROM user_wishlist w
       JOIN user_stamps s ON s.stamp_id = w.stamp_id AND s.for_trade = TRUE AND s.count > 1
       JOIN users u ON u.id = s.user_id
       WHERE w.user_id = ? AND u.id != ?`,
      [userId, userId]
    );
    res.json({ matches: rows });
  } catch (e) { res.status(500).json({ error: "Error" }); }
});

export default router;
