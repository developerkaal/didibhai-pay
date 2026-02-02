import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { env } from "../config/env.js";

// Create pool connection
// Note: Ensure env.DATABASE_URL is a valid MySQL connection string 
// e.g. mysql://root:@localhost:3306/didibhai_pay
export const pool = mysql.createPool(env.DATABASE_URL);

export const query = async <T = unknown>(text: string, params: unknown[] = []): Promise<{ rows: T[], rowCount: number, insertId?: number }> => {
  try {
    const [results] = await pool.execute(text, params);
    
    if (Array.isArray(results)) {
      return { rows: results as unknown as T[], rowCount: (results as RowDataPacket[]).length };
    } else {
      // It's a ResultSetHeader for write ops
      return { 
        rows: [], 
        rowCount: (results as ResultSetHeader).affectedRows,
        insertId: (results as ResultSetHeader).insertId 
      };
    }
  } catch (err) {
    console.error("Database Error:", err);
    throw err;
  }
};
