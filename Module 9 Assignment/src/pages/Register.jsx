import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { registerUser } from "../api/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!validator.isLength(password, { min: 6 })) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const { user, token } = await registerUser({ username, email, password });

      // Store JWT token
      localStorage.setItem("token", data.token);
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1500); // Redirect to login page w timeout
      // Optionally redirect or update UI
      console.log("User:", user, "Token:", token);

      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="relative min-h-screen py-20 bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/15 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none"></div>

      <div className="relative max-w-md mx-auto px-6 z-10 w-full">
        {/* Page title */}
        <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">
          Register
        </h2>

        {/* Registration form */}
        <div className="bg-neutral-900 border border-yellow-500/20 rounded-xl shadow-md p-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-yellow-300 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-800 border border-yellow-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-yellow-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border border-yellow-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-yellow-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-yellow-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div className="flex justify-end items-center">
              <button
                onClick={handleSubmit}
                className="bg-yellow-500 text-black font-medium py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
