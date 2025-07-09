import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !fullName)) {
      toast.warn("😅 Oops! All fields are required!", { position: "top-center" });
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("userStatus", "loggedIn");
      localStorage.setItem("userEmail", email);

      toast.success(isLogin ? "✅ Login successful!" : "🎉 Registration successful! Logging you in...", {
        position: isLogin ? "top-right" : "top-left",
      });

      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      toast.error(`❌ ${err.message}`, { position: "top-center" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/90 p-10 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center text-red-700 mb-6 font-serif">
          {isLogin ? "👋 Welcome Back!" : "📝 Create Your Account"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="😎 Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        )}

        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-red-600"
          >
            {showPassword ? "🙈 Hide" : "👁️ Show"}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition"
        >
          {isLogin ? "🚪 Login" : "🎯 Sign Up"}
        </button>

        <div className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account? 🤔" : "Already a member? 😌"}{" "}
          <span
            className="text-red-600 font-semibold cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "👉 Sign up" : "👈 Login"}
          </span>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.setItem("userStatus", "guest");
              toast.info("😎 Skipping login...");
              setTimeout(() => navigate("/home"), 1500);
            }}
            className="text-sm text-gray-600 underline hover:text-red-600 transition"
          >
            😜 Skip and continue without login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
