import { Queue, Worker, Job } from "bullmq";
import Redis from "ioredis";
import { env } from "../config/env.js";
import { query } from "../db/pool.js";

type PayoutJobData = { transactionId: string; provider: string };
type QueueLike = { add: (name: string, data: PayoutJobData, opts?: { jobId?: string }) => Promise<void> };

export const redis = env.REDIS_URL
  ? new Redis(env.REDIS_URL, { maxRetriesPerRequest: null })
  : null as unknown as Redis;

export const payoutsQueue: QueueLike = env.REDIS_URL
  ? new Queue<PayoutJobData>("payouts", { connection: redis as Redis })
  : {
      add: async () => Promise.resolve(),
    };

export const initQueueWorker = () => {
  if (!env.REDIS_URL) return;
  const worker = new Worker<PayoutJobData>("payouts", async (job: Job<PayoutJobData>) => {
    const { transactionId, provider } = job.data;
    const tx = await query("SELECT * FROM transactions WHERE id=?", [
      transactionId,
    ]).then((r) => r.rows[0]);
    if (!tx) return;
    await query("UPDATE transactions SET status='PAYOUT_PROCESSING' WHERE id=?", [transactionId]);
    await query(
      "INSERT INTO payouts (transaction_id, provider, amount, currency, status) VALUES (?,?,?,?,'PENDING')",
      [transactionId, provider, tx.payout_amount, tx.currency]
    );
    await query("UPDATE transactions SET status='COMPLETED' WHERE id=?", [
      transactionId,
    ]);
  }, { connection: redis as Redis });
  worker.on("failed", async (job) => {
    const data = job?.data as PayoutJobData | undefined;
    if (data?.transactionId) {
      await query("UPDATE transactions SET status='FAILED' WHERE id=?", [
        data.transactionId,
      ]);
    }
  });
};
