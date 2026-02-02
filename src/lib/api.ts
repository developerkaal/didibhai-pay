import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface QuoteResponse {
  rate: number;
  feeTotal: number;
  payoutAmount: number;
  feePercentage: number;
}

export interface CreateTransactionParams {
  direction: "NP-IN" | "IN-NP";
  amount: number;
  currency: string;
  senderDetails: any;
  receiverDetails: any;
}

export interface Transaction {
  id: string;
  status: string;
  amount: number;
  currency: string;
  sender_details: any;
  receiver_details: any;
  created_at: string;
}

export const getQuote = async (
  amount: number,
  direction: "NP-IN" | "IN-NP",
) => {
  return api.post("/quote", { amount, direction });
};

export const createTransaction = async (data: CreateTransactionParams) => {
  return api.post("/create-transaction", data);
};

export const getTransactions = async () => {
  // Use admin endpoint for dashboard for now, or user specific if implemented
  return api.get("/admin/transactions");
};

export const getMyTransactions = async () => {
  // We haven't implemented GET /transactions for user yet, but let's assume we will or use a filter
  // For now, let's just use the same endpoint but filtered on backend?
  // No, let's implement GET /transactions in backend for the user.
  // I'll add that to backend/transactions.ts later.
  return api.get("/transactions");
};

export const getUsers = async () => {
  return api.get("/admin/users");
};

export const getAnalytics = async (timeRange: string) => {
  return api.get(`/admin/analytics?range=${timeRange}`);
};
