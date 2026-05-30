import mysql from "mysql2/promise";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
};

const pool = mysql.createPool({
  host: required("DB_HOST"),
  port: Number(process.env.DB_PORT || "3306"),
  user: required("DB_USER"),
  password: required("DB_PASSWORD"),
  database: required("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
