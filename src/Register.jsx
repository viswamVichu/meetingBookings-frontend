import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/register`, {
        email,
        password,
        role,
      });

      alert("Registration successful! You can login now.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="pt-[120px] w-full min-h-screen bg-white">
      <div className="flex items-center justify-center h-full mt-[200px]">
        <form
          onSubmit={handleSubmit}
          className=" bg-[#004030] text-white  rounded-lg p-8  shadow-md min-w-[350px]"
        >
          <h2 className="mb-4 font-bold text-xl text-center">Register</h2>
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
          <select
            className="block text-black mb-4 p-2 border rounded w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="approver">Approver</option>
          </select>
          <button
            className="bg-[#06923E] text-white px-4 py-2 rounded w-full"
            type="submit"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-[#78C841] font-bold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
