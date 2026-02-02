import { query } from "../db/pool.js";

export type LedgerEntryInput = { entry_type: string; amount: number; currency: string; meta?: Record<string, unknown> | null };

export const recordLedger = async (transactionId: string, entries: Array<LedgerEntryInput>) => {
  for (const e of entries) {
    await query(
      "INSERT INTO ledger_entries (transaction_id, entry_type, amount, currency, meta) VALUES (?,?,?,?,?)",
      [transactionId, e.entry_type, e.amount, e.currency, e.meta ?? null]
    );
  }
};
