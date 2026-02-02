import { Router, Request } from "express";
import { query } from "../db/pool.js";
import { payoutsQueue } from "../lib/queue.js";

export const router = Router();

router.post("/trigger-payout", async (req: Request & { body: { transactionId?: string } }, res) => {
  const { transactionId } = req.body;
  const tx = await query("SELECT * FROM transactions WHERE id=?", [
    transactionId,
  ]).then((r) => r.rows[0]);
  if (!tx) return res.status(404).json({ error: "not_found" });
  const provider = tx.direction === "NP-IN" ? "razorpay" : "esewa";
  await payoutsQueue.add("payout", { transactionId, provider }, { jobId: transactionId });
  res.json({ queued: true });
});
