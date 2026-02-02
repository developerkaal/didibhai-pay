import { Router } from "express";
import { z } from "zod";
import { query } from "../db/pool.js";
import { idempotency } from "../middleware/idempotency.js";
import { requireAuth, RequestWithUser } from "../middleware/auth.js";
import { randomUUID } from "crypto";

export const router = Router();

const QuoteSchema = z.object({
  direction: z.enum(["NP-IN", "IN-NP"]),
  amount: z.number().positive(),
});

router.post("/quote", async (req, res) => {
  const parsed = QuoteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid" });
  const { direction, amount } = parsed.data;
  const pair = direction === "NP-IN" ? "NPR-INR" : "INR-NPR";

  const fx = await query("SELECT rate FROM fx_rates WHERE pair=?", [pair]).then(
    (r) => r.rows[0],
  );
  if (!fx || !(fx as any).rate)
    return res.status(503).json({ error: "no_rate" });
  const rate = Number((fx as any).rate);
  const fees = await query(
    "SELECT fixed_fee, percent_fee FROM fees WHERE name='default'",
  ).then((r) => r.rows[0]);
  const fixed = Number((fees as any)?.fixed_fee ?? 0);
  const percent = Number((fees as any)?.percent_fee ?? 0);

  // Tiered fee calculation: fixed fee for amounts up to 1000, percentage fee for higher amounts (only one type applied)
  const threshold = 1000;
  let feeTotal;
  let feePercentage;

  if (amount <= threshold) {
    feeTotal = fixed;
    feePercentage = 0;
  } else {
    feeTotal = amount * (percent / 100);
    feePercentage = percent;
  }

  const payoutAmount = amount * rate;
  const totalToPay = amount + feeTotal;

  res.json({
    rate,
    feeTotal,
    payoutAmount,
    feePercentage,
    totalToPay,
  });
});

const CreateTxSchema = z.object({
  direction: z.enum(["NP-IN", "IN-NP"]),
  senderDetails: z.record(z.any()),
  receiverDetails: z.record(z.any()),
  amount: z.number().positive(),
  currency: z.enum(["INR", "NPR"]),
});

router.post("/create-transaction", idempotency, async (req, res) => {
  const parsed = CreateTxSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid" });
  const { direction, senderDetails, receiverDetails, amount, currency } =
    parsed.data;
  const pair = direction === "NP-IN" ? "NPR-INR" : "INR-NPR";
  const fx = await query("SELECT rate FROM fx_rates WHERE pair=?", [pair]).then(
    (r) => r.rows[0],
  );
  if (!fx || !(fx as any).rate)
    return res.status(503).json({ error: "no_rate" });
  const rate = Number((fx as any).rate);
  const fees = await query(
    "SELECT fixed_fee, percent_fee FROM fees WHERE name='default'",
  ).then((r) => r.rows[0]);
  const fixed = Number((fees as any)?.fixed_fee ?? 0);
  const percent = Number((fees as any)?.percent_fee ?? 0);

  // Tiered fee calculation: fixed fee for amounts up to 1000, percentage for higher amounts
  const threshold = 1000;
  let feeTotal;

  if (amount <= threshold) {
    feeTotal = fixed;
  } else {
    feeTotal = fixed + amount * percent;
  }

  const payoutAmount = amount * rate;
  const totalToPay = amount + feeTotal;

  const id = randomUUID();
  const senderUserId = (senderDetails as { id?: string })?.id ?? null;

  await query(
    "INSERT INTO transactions (id, direction, sender_user_id, sender_details, receiver_details, amount, currency, exchange_rate, fees_total, payout_amount, status) VALUES (?,?,?,?,?,?,?,?,?,?,'INITIATED')",
    [
      id,
      direction,
      senderUserId,
      JSON.stringify(senderDetails),
      JSON.stringify(receiverDetails),
      amount,
      currency,
      rate,
      feeTotal,
      payoutAmount,
    ],
  );

  res.json({ id, status: "INITIATED", payoutAmount, totalToPay });
});

router.get("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  const tx = await query("SELECT * FROM transactions WHERE id=?", [id]).then(
    (r) => r.rows[0],
  );
  if (!tx) return res.status(404).json({ error: "not_found" });
  res.json(tx);
});

router.get("/transactions", requireAuth, async (req: RequestWithUser, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "unauthorized" });
  const rows = await query(
    "SELECT * FROM transactions WHERE sender_user_id=? ORDER BY created_at DESC LIMIT 100",
    [user.sub],
  ).then((r) => r.rows);
  res.json(rows);
});
