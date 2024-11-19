import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout.jsx";
import { login as apiLogin } from '../services/authService.js'; // Import the login function
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await apiLogin({ email, password }); // Call the API service's login function
  
      const { token, msg } = response;  // Ensure the response has 'token' and 'msg'
      toast.success(msg); // Display the success message
      localStorage.setItem("token", token); // Store token in localStorage
      navigate("/"); // Redirect to home or dashboard page
    } catch (error) {
      toast.error(
        error?.message || "Unable to log in. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Redirect to Register */}
          <div className="mt-4 text-sm text-center">
            <p>
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 hover:underline"
              >
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
