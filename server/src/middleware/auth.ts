import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Request, Response, NextFunction } from "express";

export interface JwtPayload { sub: string; role: string }
export type RequestWithUser = Request & { user?: JwtPayload };

export const requireAuth = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "unauthorized" });
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "unauthorized" });
  }
};

export const requireAdmin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== "admin") return res.status(403).json({ error: "forbidden" });
  next();
};
