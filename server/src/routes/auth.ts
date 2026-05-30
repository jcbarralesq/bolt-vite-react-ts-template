import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("Missing required env var: JWT_SECRET");

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Usuario y contraseña requeridos" });
      return;
    }
    if (username.length < 3 || username.length > 50) {
      res.status(400).json({ error: "Usuario debe tener entre 3 y 50 caracteres" });
      return;
    }
    if (password.length < 4) {
      res.status(400).json({ error: "Contraseña debe tener al menos 4 caracteres" });
      return;
    }

    const [existing] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
    if ((existing as any[]).length > 0) {
      res.status(409).json({ error: "El usuario ya existe" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash]);
    const userId = (result as any).insertId;

    const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "30d" });
    res.status(201).json({ token, userId, username });
  } catch (e: any) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Usuario y contraseña requeridos" });
      return;
    }

    const [rows] = await pool.query("SELECT id, username, password_hash FROM users WHERE username = ?", [username]);
    const users = rows as any[];
    if (users.length === 0) {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      return;
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      return;
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, userId: user.id, username: user.username });
  } catch (e: any) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

router.get("/me", async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    const token = auth.slice(7);
    const payload = jwt.verify(token, JWT_SECRET) as any;
    res.json({ userId: payload.userId, username: payload.username });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

export default router;
