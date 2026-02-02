import { query } from "../db/pool.js";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const createAdmin = async () => {
  const email = "admin@didibhai.com";
  const password = "adminpassword123";

  console.log(`Creating admin user: ${email} / ${password}`);

  try {
    const hash = await bcrypt.hash(password, 10);
    const id = randomUUID();

    // Check if exists in admin_users
    const existing = await query("SELECT id FROM admin_users WHERE email=?", [email]).then(r => r.rows[0]);
    if (existing) {
        console.log("Admin user already exists.");
    } else {
        await query(
            "INSERT INTO admin_users (id, email, password_hash, role) VALUES (?, ?, ?, ?)",
            [id, email, hash, "admin"]
        );
        console.log("Admin user created successfully.");
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    process.exit(0);
  }
};

createAdmin();
