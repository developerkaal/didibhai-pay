import { Router } from "express";
import { z } from "zod";
import { query } from "../db/pool.js";

export const router = Router();

const RazorpayOrderSchema = z.object({
  transactionId: z.string().uuid(),
});

router.post("/payments/razorpay/order", async (req, res) => {
  const parsed = RazorpayOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid" });
  const { transactionId } = parsed.data;
  const tx = await query("SELECT * FROM transactions WHERE id=?", [
    transactionId,
  ]).then((r) => r.rows[0]);
  if (!tx) return res.status(404).json({ error: "not_found" });
  const providerRef = `order_${transactionId.slice(0, 8)}`;
  await query(
    "INSERT INTO payments (transaction_id, provider, provider_ref, amount, currency, status) VALUES (?,'razorpay',?,?,?,'PENDING')",
    [transactionId, providerRef, tx.amount, tx.currency]
  );
  res.json({ id: providerRef, amount: tx.amount, currency: tx.currency });
});

const EsewaInitSchema = z.object({
  transactionId: z.string().uuid(),
});

router.post("/payments/esewa/initiate", async (req, res) => {
  const parsed = EsewaInitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid" });
  const { transactionId } = parsed.data;
  const tx = await query("SELECT * FROM transactions WHERE id=?", [
    transactionId,
  ]).then((r) => r.rows[0]);
  if (!tx) return res.status(404).json({ error: "not_found" });
  const redirectUrl = `https://esewa.example/redirect?tx=${transactionId}`;
  await query(
    "INSERT INTO payments (transaction_id, provider, provider_ref, amount, currency, status) VALUES (?,'esewa',?,?,?,'PENDING')",
    [transactionId, redirectUrl, tx.amount, tx.currency]
  );
  res.json({ redirectUrl });
});

const KhaltiInitSchema = z.object({
  transactionId: z.string().uuid(),
});

router.post("/payments/khalti/initiate", async (req, res) => {
  const parsed = KhaltiInitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid" });
  const { transactionId } = parsed.data;
  const tx = await query("SELECT * FROM transactions WHERE id=?", [
    transactionId,
  ]).then((r) => r.rows[0]);
  if (!tx) return res.status(404).json({ error: "not_found" });
  const redirectUrl = `https://khalti.example/redirect?tx=${transactionId}`;
  await query(
    "INSERT INTO payments (transaction_id, provider, provider_ref, amount, currency, status) VALUES (?,'khalti',?,?,?,'PENDING')",
    [transactionId, redirectUrl, tx.amount, tx.currency]
  );
  res.json({ redirectUrl });
});
