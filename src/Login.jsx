import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/login`, { email, password });
      const { success, role, status, message } = res.data;

      if (!success) {
        return setError(message || "Invalid email or password");
      }

      // ⛔ Block access for pending users
      // if (status !== "approved") {
      //   return setError(
      //     "Your account is pending approval. Please wait for admin action."
      //   );
      // }

      // 💾 Store session details
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("role", role);
      localStorage.setItem("status", status);

      alert("Login successful!");
      console.log("✅ Login response:", res.data);

      // 🌐 Route based on role

      if (role === "approver") {
        navigate("/approver-panel");
      } else if (role === "user") {
        navigate("/home"); // ✅ this matches your routing access
      } else {
        navigate("/user-access"); // fallback for unexpected role
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again later."
      );
    }
  };

  return (
    <section className="pt-[120px] w-full min-h-screen bg-white">
      <div className="flex items-center justify-center h-full mt-[200px]">
        <form
          onSubmit={handleLogin}
          className="bg-[#004030] text-white rounded-lg p-8 shadow-md min-w-[350px]"
        >
          <h2 className="mb-4 font-bold text-xl text-center">Login</h2>

          {error && (
            <div className="mb-2 text-red-500 bg-white px-2 py-1 text-center rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="block mb-2 p-2 border rounded w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="block mb-4 p-2 border rounded w-full text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="bg-[#06923E] text-white px-4 py-2 rounded w-full hover:bg-[#057a33]"
            type="submit"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <span
              className="text-[#78C841] font-bold underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
