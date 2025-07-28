import React, { useState } from "react";
import validator from "validator";
import { loginUser } from "../api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Use the loginUser helper function
      const { user, token } = await loginUser({ username, password });

      localStorage.setItem("token", token);
      setSuccess("Login successful!");
      console.log("User:", user, "Token:", token);

      // Clear the form
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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
          Login
        </h2>

        {/* Login form */}
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
            <div className="flex justify-between items-center">
              <a
                href="/forgot-password"
                className="text-sm text-yellow-500 hover:underline"
              >
                Forgot Password?
              </a>
              <button
                onClick={handleSubmit}
                className="bg-yellow-500 text-black font-medium py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
