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
    setError(""); // Clear previous error

    try {
      const res = await axios.post(`${API_URL}/api/login`, { email, password });

      const { success, role, status, message } = res.data;

      if (success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("status", status);

        // // ✅ Block only non-approvers with pending status
        // if (res.data.status !== "approved" && res.data.role !== "approver") {
        //   setError("Your account is pending approval. Please wait.");
        //   return;
        // }

        alert("Login successful!");
        console.log("Login response:", res.data);

        if (role === "approver") {
          navigate("/approver-panel");
        } else {
          navigate("/home");
        }
      } else {
        setError(message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
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
            <div className="mb-2 text-red-600 text-center">{error}</div>
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
            className="bg-[#06923E] text-white px-4 py-2 rounded w-full"
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
