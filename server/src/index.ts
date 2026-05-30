import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import collectionRoutes from "./routes/collection.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/collection", collectionRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API FIFA World Cup 2026 running on port ${PORT}`);
});
