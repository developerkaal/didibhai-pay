const verify = async () => {
  const baseUrl = "http://localhost:3000/api";
  const userEmail = `user_${Date.now()}@example.com`;
  const userPass = "password123";
  const adminEmail = "admin@didibhai.com";
  const adminPass = "adminpassword123";

  console.log("--- Starting Auth Verification ---");

  // 1. Register User
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
        fullName: "Test User",
        country: "NP",
        phone: "9800000000"
      })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      console.log("✅ User Registration: Success");
    } else {
      console.error("❌ User Registration: Failed", data);
    }
  } catch (e) {
    console.error("❌ User Registration: Error", e);
  }

  // 2. Login User
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password: userPass })
    });
    const data = await res.json();
    if (res.ok && data.token && data.user.email === userEmail) {
      console.log("✅ User Login: Success");
      
      // 2a. Check /me
      const meRes = await fetch(`${baseUrl}/auth/me`, {
        headers: { "Authorization": `Bearer ${data.token}` }
      });
      const meData = await meRes.json();
      if (meRes.ok && meData.email === userEmail) {
         console.log("✅ User /me: Success");
      } else {
         console.error("❌ User /me: Failed", meData);
      }

      // 2b. Check Admin Route (Should Fail)
      const adminRes = await fetch(`${baseUrl}/admin/transactions`, {
        headers: { "Authorization": `Bearer ${data.token}` }
      });
      if (adminRes.status === 403) {
         console.log("✅ User Access to Admin Route: Denied (Correct)");
      } else {
         console.error(`❌ User Access to Admin Route: Unexpected Status ${adminRes.status}`);
      }

    } else {
      console.error("❌ User Login: Failed", data);
    }
  } catch (e) {
    console.error("❌ User Login: Error", e);
  }

  // 3. Login Admin
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adminEmail, password: adminPass })
    });
    const data = await res.json();
    
    if (res.ok && data.token && data.role === 'admin') {
      console.log("✅ Admin Login: Success");

      // 3a. Check Admin Route (Should Succeed)
      const adminRes = await fetch(`${baseUrl}/admin/transactions`, {
        headers: { "Authorization": `Bearer ${data.token}` }
      });
      if (adminRes.ok) {
         console.log("✅ Admin Access to Admin Route: Allowed (Correct)");
      } else {
         console.error(`❌ Admin Access to Admin Route: Failed Status ${adminRes.status}`);
      }

    } else {
      console.error("❌ Admin Login: Failed (or not admin role)", data);
    }
  } catch (e) {
    console.error("❌ Admin Login: Error", e);
  }
};

verify();
