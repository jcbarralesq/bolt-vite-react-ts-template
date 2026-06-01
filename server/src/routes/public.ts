import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { teamConfederation } from "../data/stampMeta.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;
const TOTAL = 960;

router.get("/profile/:username", async (req: Request, res: Response) => {
  try {
    const [users] = await pool.query(
      "SELECT id, username, public_profile FROM users WHERE username = ?",
      [req.params.username]
    );
    const u = (users as any[])[0];
    if (!u || !u.public_profile) { res.status(404).json({ error: "Perfil no encontrado" }); return; }

    const [rows] = await pool.query(
      "SELECT stamp_id, count, exchanged, for_trade FROM user_stamps WHERE user_id = ? AND count > 0",
      [u.id]
    );
    const stamps: Record<string, { count: number; exchanged: number; for_trade: boolean }> = {};
    const ownedSet = new Set<string>();
    for (const r of rows as any[]) {
      stamps[r.stamp_id] = { count: r.count, exchanged: r.exchanged, for_trade: r.for_trade === 1 || r.for_trade === true };
      ownedSet.add(r.stamp_id);
    }

    const [wlRows] = await pool.query("SELECT stamp_id FROM user_wishlist WHERE user_id = ?", [u.id]);
    const wishlist = (wlRows as any[]).map((r: any) => r.stamp_id);

    const teams: Record<string, { id: string; name: string; flag: string; owned: number; total: number }> = {};
    for (const r of rows as any[]) {
      const tid = r.stamp_id.split("-")[0];
      if (!teams[tid]) teams[tid] = { id: tid, name: tid, flag: "", owned: 0, total: 20 };
      teams[tid].owned++;
    }

    const progress = Math.round((ownedSet.size / TOTAL) * 100);
    const duplicatesForTrade = Object.entries(stamps)
      .filter(([, v]) => v.for_trade && v.count > 1)
      .map(([stampId, v]) => ({ stampId, count: v.count }));

    res.json({
      username: u.username, progress, uniqueOwned: ownedSet.size, totalStamps: TOTAL,
      teams: Object.values(teams),
      duplicatesForTrade,
      wishlist,
    });
  } catch (e: any) {
    res.status(500).json({ error: "Error" });
  }
});

router.post("/profile/visibility", async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) { res.status(401).json({ error: "No autorizado" }); return; }
  let userId: number;
  try { const p = jwt.verify(auth.slice(7), JWT_SECRET) as any; userId = p.userId; } catch { res.status(401).json({ error: "Token inválido" }); return; }
  const { public: isPublic } = req.body;
  await pool.query("UPDATE users SET public_profile = ? WHERE id = ?", [isPublic ? 1 : 0, userId]);
  res.json({ public_profile: isPublic });
});

router.get("/profile/visibility", async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) { res.status(401).json({ error: "No autorizado" }); return; }
  let userId: number;
  try { const p = jwt.verify(auth.slice(7), JWT_SECRET) as any; userId = p.userId; } catch { res.status(401).json({ error: "Token inválido" }); return; }
  const [rows] = await pool.query("SELECT public_profile FROM users WHERE id = ?", [userId]);
  res.json({ public_profile: (rows as any[])[0]?.public_profile === 1 });
});

export default router;
