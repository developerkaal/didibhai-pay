import dotenv from "dotenv";

dotenv.config();

const required = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    // In development we might want to warn or just return empty string if it's not critical,
    // but for "required" variables it should probably throw or return a default that works.
    // For this setup, let's just return fallback or empty string to satisfy types, 
    // but really we should ensure they exist.
    if (process.env.NODE_ENV === "production") {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return "";
  }
  return value;
};

export const env = {
  NODE_ENV: required("NODE_ENV", "development"),
  PORT: Number(required("PORT", "3000")),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:8080,http://localhost:8081",
  DATABASE_URL: required("DATABASE_URL", "mysql://root:@localhost:3306/didibhai_pay"),
  REDIS_URL: required("REDIS_URL", ""),
  JWT_SECRET: required("JWT_SECRET", "change_me"),
  ENCRYPTION_KEY: required("ENCRYPTION_KEY"),
  RAZORPAY_KEY_ID: required("RAZORPAY_KEY_ID"),
  RAZORPAY_KEY_SECRET: required("RAZORPAY_KEY_SECRET"),
  ESEWA_SECRET: required("ESEWA_SECRET"),
  KHALTI_SECRET: required("KHALTI_SECRET"),
};
