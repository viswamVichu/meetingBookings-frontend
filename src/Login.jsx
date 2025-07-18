import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy users with roles
const USERS = [
  { email: "user@example.com", password: "password123", role: "user" },
  { email: "viswam_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "guru_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "santhosh_rs@mssrf.res.in", password: "password123", role: "user" },
  { email: "basith_m@mssrf.res.in", password: "password123", role: "user" },
  { email: "sriram_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "venkatesh_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "saravana_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "vinoth_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "hari_s@mssrf.res.in", password: "password123", role: "user" },
  { email: "approver@example.com", password: "approver123", role: "approver" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Find user by email and password
    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setError("");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", found.role);
      // Redirect based on role
      if (found.role === "approver") {
        navigate("/approver-panel");
      } else {
        navigate("/meeting-booking");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="pt-[120px] w-full min-h-screen bg-[green]">
      <div className="flex items-center justify-center h-full">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md min-w-[320px]"
        >
          <h2 className="mb-4 font-bold text-xl text-center">Login</h2>
          {error && (
            <div className="mb-2 text-red-600 text-center">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="block mb-2 p-2 border rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="block mb-4 p-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
