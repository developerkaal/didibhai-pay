import { Request, Response, NextFunction } from "express";
import { redis } from "../lib/queue.js";

export const idempotency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = (req.headers["idempotency-key"] as string) ?? "";
  if (!key) return next();
  const exists = await redis.get(`idem:${key}`);
  if (exists) return res.status(409).json({ error: "duplicate" });
  await redis.set(`idem:${key}`, "1", "EX", 60 * 60);
  next();
};
