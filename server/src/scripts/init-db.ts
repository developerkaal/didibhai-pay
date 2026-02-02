import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const init = async () => {
  // 1. Connect to MySQL server (no DB selected) to create DB
  // Assuming local dev defaults for Laragon if not fully specified
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Laragon default
  });

  try {
    console.log("Connected to MySQL server...");

    // Create DB
    await connection.query("CREATE DATABASE IF NOT EXISTS didibhai_pay");
    console.log("Database 'didibhai_pay' created or exists.");

    await connection.query("USE didibhai_pay");

    // Read schema
    const schemaPath = path.join(__dirname, "../db/schema.mysql.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    // Split statements (simple split by ;)
    const statements = schemaSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await connection.query(stmt);
    }

    console.log("Schema applied successfully.");

    // Seed basic data
    // 1. FX Rates
    await connection.query(`
      INSERT INTO fx_rates (pair, rate) VALUES
      ('NPR-INR', 0.625),
      ('INR-NPR', 1.60)
      ON DUPLICATE KEY UPDATE rate=VALUES(rate)
    `);

    // 2. Fees
    await connection.query(`
      INSERT INTO fees (name, fixed_fee, percent_fee) VALUES
      ('default', 0, 0.01)
      ON DUPLICATE KEY UPDATE fixed_fee=VALUES(fixed_fee)
    `);

    // 3. Seed user
    const hash = await bcrypt.hash("password123", 10);
    await connection.query(
      `
      INSERT INTO users (id, email, password_hash, full_name, country, phone) VALUES
      ('seed-user-id', 'user@example.com', ?, 'Test User', 'NP', '1234567890')
      ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)
    `,
      [hash],
    );

    console.log("Seed data applied.");
  } catch (err) {
    console.error("Init Error:", err);
  } finally {
    await connection.end();
  }
};

init();
