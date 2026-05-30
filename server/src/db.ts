import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "REDACTED_IP",
  port: Number(process.env.DB_PORT) || 53798,
  user: process.env.DB_USER || "projects_user",
  password: process.env.DB_PASSWORD || "REDACTED_PASSWORD",
  database: process.env.DB_NAME || "panini2026",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
