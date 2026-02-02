import { Router } from "express";
import { query } from "../db/pool.js";
import { payoutsQueue } from "../lib/queue.js";

export const router = Router();

router.post("/razorpay", async (req, res) => {
  const payload = req.body;
  const provider = "razorpay";
  await query(
    "INSERT INTO webhook_logs (provider, event_type, payload, verified) VALUES (?,?,?,?)",
    [provider, payload.event, payload, true]
  );
  const orderId = payload.payload?.payment?.entity?.order_id;
  if (orderId) {
    const payment = await query(
      "SELECT * FROM payments WHERE provider='razorpay' AND provider_ref=?",
      [orderId]
    ).then((r) => r.rows[0]);
    if (payment) {
      await query("UPDATE payments SET status='PAID' WHERE id=?", [payment.id]);
      const txId = payment.transaction_id;
      await query(
        "UPDATE transactions SET status='PAID' WHERE id=?",
        [txId]
      );
      await payoutsQueue.add("payout", { transactionId: txId, provider: "razorpay" }, { jobId: txId });
    }
  }
  res.json({ ok: true });
});

router.post("/esewa", async (req, res) => {
  const payload = req.body;
  await query(
    "INSERT INTO webhook_logs (provider, event_type, payload, verified) VALUES (?,?,?,?)",
    ["esewa", payload.event, payload, true]
  );
  const ref = payload.ref;
  const payment = await query(
    "SELECT * FROM payments WHERE provider='esewa' AND provider_ref=?",
    [ref]
  ).then((r) => r.rows[0]);
  if (payment) {
    await query("UPDATE payments SET status='PAID' WHERE id=?", [payment.id]);
    const txId = payment.transaction_id;
    await query("UPDATE transactions SET status='PAID' WHERE id=?", [txId]);
    await payoutsQueue.add("payout", { transactionId: txId, provider: "esewa" }, { jobId: txId });
  }
  res.json({ ok: true });
});

router.post("/khalti", async (req, res) => {
  const payload = req.body;
  await query(
    "INSERT INTO webhook_logs (provider, event_type, payload, verified) VALUES (?,?,?,?)",
    ["khalti", payload.event, payload, true]
  );
  const ref = payload.ref;
  const payment = await query(
    "SELECT * FROM payments WHERE provider='khalti' AND provider_ref=?",
    [ref]
  ).then((r) => r.rows[0]);
  if (payment) {
    await query("UPDATE payments SET status='PAID' WHERE id=?", [payment.id]);
    const txId = payment.transaction_id;
    await query("UPDATE transactions SET status='PAID' WHERE id=?", [txId]);
    await payoutsQueue.add("payout", { transactionId: txId, provider: "khalti" }, { jobId: txId });
  }
  res.json({ ok: true });
});
