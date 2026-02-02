import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { router as transactions } from "./modules/transactions.js";
import { router as payments } from "./modules/payments.js";
import { router as webhooks } from "./modules/webhooks.js";
import { router as payouts } from "./modules/payouts.js";
import { router as admin } from "./modules/admin.js";
import { router as auth } from "./modules/auth.js";

const app = express();

const origins = (env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
if (env.NODE_ENV === "development") {
  origins.push("http://localhost:8080", "http://localhost:8081");
}
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/api/health", (_, res) => {
  res.json({ ok: true });
});

app.use("/api", transactions);
app.use("/api", payments);
app.use("/api/webhooks", webhooks);
app.use("/api", payouts);
app.use("/api/admin", admin);
app.use("/api/auth", auth);

export { app };
