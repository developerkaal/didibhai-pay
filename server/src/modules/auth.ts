import { Router, Request } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/pool.js";
import { env } from "../config/env.js";
import { randomUUID } from "crypto";
import { requireAuth as auth } from "../middleware/auth.js";

export const router = Router();

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  country: z.enum(["NP", "IN"]), // Nepal or India
  phone: z.string().min(10),
});

router.post("/register", async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const { email, password, fullName, country, phone } = parsed.data;

  // Check existing
  const existing = await query("SELECT id FROM users WHERE email=?", [
    email,
  ]).then((r) => r.rows[0]);
  if (existing) return res.status(409).json({ error: "email_taken" });

  const hash = await bcrypt.hash(password, 10);
  const id = randomUUID();

  await query(
    "INSERT INTO users (id, email, password_hash, full_name, country, phone) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, hash, fullName, country, phone],
  );

  // Login immediately
  const token = jwt.sign({ sub: id, role: "user" }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, user: { id, email, fullName, country } });
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/login", async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid" });

  const { email, password } = parsed.data;

  // 1. Try finding in regular users
  let user = await query("SELECT * FROM users WHERE email=?", [email]).then(
    (r) => r.rows[0],
  );
  let role = "user";

  if (!user) {
    // 2. Try finding in admin_users
    user = await query("SELECT * FROM admin_users WHERE email=?", [email]).then(
      (r) => r.rows[0],
    );
    if (user) {
      role = "admin";
    }
  }

  if (!user) return res.status(401).json({ error: "invalid_credentials" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: "invalid_credentials" });

  const token = jwt.sign({ sub: user.id, role }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name || "Admin", // Admin table doesn't have full_name usually, or maybe it does? Schema says no.
      country: user.country || "NP", // Admin table doesn't have country
    },
    role, // Return role so frontend knows
  });
});

router.get(
  "/me",
  auth,
  async (req: Request & { user?: { sub: string; role?: string } }, res) => {
    let user;

    if (req.user?.role === "admin") {
      // For admin users, query admin_users table
      user = await query("SELECT id, email FROM admin_users WHERE id=?", [
        req.user?.sub,
      ]).then((r) => r.rows[0]);
      if (user) {
        res.json({
          id: user.id,
          email: user.email,
          fullName: "Admin", // Admin table doesn't have full_name
          country: "NP", // Default country for admins
          role: "admin",
        });
        return;
      }
    } else {
      // For regular users, query users table
      user = await query(
        "SELECT id, email, full_name, country, phone FROM users WHERE id=?",
        [req.user?.sub],
      ).then((r) => r.rows[0]);
      if (user) {
        res.json({
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          country: user.country,
          phone: user.phone,
          role: req.user?.role || "user",
        });
        return;
      }
    }

    return res.status(404).json({ error: "not_found" });
  },
);
