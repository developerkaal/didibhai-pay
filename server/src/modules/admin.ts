import { Router } from "express";
import { query } from "../db/pool.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const router = Router();

router.get("/users", requireAuth, requireAdmin, async (req, res) => {
  const rows = await query(
    "SELECT id, email, phone, full_name, country, created_at FROM users ORDER BY created_at DESC",
  );
  res.json(rows);
});

router.get("/analytics", requireAuth, requireAdmin, async (req, res) => {
  const { range = "30d" } = req.query as { range?: string };

  // Calculate date range
  const now = new Date();
  let startDate: Date;
  switch (range) {
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "90d":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  // Get transaction stats
  const transactionStats = await query(
    `
    SELECT
      COUNT(*) as total_transactions,
      SUM(amount) as total_volume,
      AVG(amount) as avg_transaction,
      COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_transactions
    FROM transactions
    WHERE created_at >= ?
  `,
    [startDate.toISOString()],
  );

  // Get user stats
  const userStats = await query(
    `
    SELECT COUNT(*) as total_users
    FROM users
    WHERE created_at >= ?
  `,
    [startDate.toISOString()],
  );

  // Get pending payouts
  const pendingPayouts = await query(`
    SELECT COUNT(*) as pending_count
    FROM payouts
    WHERE status != 'COMPLETED'
  `);

  const stats = transactionStats.rows[0] as any;
  const users = userStats.rows[0] as any;
  const payouts = pendingPayouts.rows[0] as any;

  res.json({
    totalVolume: Number(stats.total_volume || 0),
    totalTransactions: Number(stats.total_transactions || 0),
    avgTransaction: Number(stats.avg_transaction || 0),
    completedTransactions: Number(stats.completed_transactions || 0),
    totalUsers: Number(users.total_users || 0),
    pendingPayouts: Number(payouts.pending_count || 0),
    successRate:
      stats.total_transactions > 0
        ? (stats.completed_transactions / stats.total_transactions) * 100
        : 0,
  });
});

router.get("/fx-rates", requireAuth, requireAdmin, async (req, res) => {
  const rows = await query("SELECT pair, rate FROM fx_rates ORDER BY pair");
  res.json(rows);
});

router.post("/fx-rate", requireAuth, async (req, res) => {
  const { pair, rate } = req.body;
  if (!pair || typeof rate !== "number") {
    return res.status(400).json({ error: "Invalid pair or rate" });
  }
  await query(
    "INSERT INTO fx_rates (pair, rate, updated_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE rate = VALUES(rate), updated_at = NOW()",
    [pair, rate],
  );
  res.json({ success: true });
});

router.get("/fees", requireAuth, requireAdmin, async (req, res) => {
  const fees = await query(
    "SELECT fixed_fee, percent_fee FROM fees WHERE name = 'default'",
  );
  if (fees.rows.length === 0) {
    return res.json({ fixedFee: 0, percentFee: 0 });
  }
  const fee = fees.rows[0] as any;
  res.json({
    fixedFee: Number(fee.fixed_fee),
    percentFee: Number(fee.percent_fee),
  });
});

router.post("/fees", requireAuth, async (req, res) => {
  const { fixedFee, percentFee } = req.body;
  if (typeof fixedFee !== "number" || typeof percentFee !== "number") {
    return res.status(400).json({ error: "Invalid fees" });
  }
  await query(
    "INSERT INTO fees (name, fixed_fee, percent_fee, updated_at) VALUES ('default', ?, ?, NOW()) ON DUPLICATE KEY UPDATE fixed_fee = VALUES(fixed_fee), percent_fee = VALUES(percent_fee), updated_at = NOW()",
    [fixedFee, percentFee],
  );
  res.json({ success: true });
});

router.get("/transactions", requireAuth, requireAdmin, async (req, res) => {
  const rows = await query(
    "SELECT * FROM transactions ORDER BY created_at DESC",
  );
  res.json({ rows: rows.rows });
});
