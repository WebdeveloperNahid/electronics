"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-zinc-800 p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-black dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-2xl shadow-sm">
            E
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1 text-center">
          Create account
        </h1>
        <p className="text-sm text-gray-400 dark:text-zinc-400 text-center mb-6">
          Join ElectroShop today
        </p>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-xs mb-4 text-center bg-red-50 dark:bg-red-500/10 py-2 rounded-lg border border-red-100 dark:border-red-500/20">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg px-3 py-2.5 gap-2 focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-colors shadow-xs">
            <FiUser className="text-gray-400 dark:text-zinc-500" size={16} />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-sm outline-none bg-transparent text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg px-3 py-2.5 gap-2 focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-colors shadow-xs">
            <FiMail className="text-gray-400 dark:text-zinc-500" size={16} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm outline-none bg-transparent text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg px-3 py-2.5 gap-2 focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-colors shadow-xs">
            <FiLock className="text-gray-400 dark:text-zinc-500" size={16} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full text-sm outline-none bg-transparent text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-600"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 shadow-sm mt-1"
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-xs text-gray-500 dark:text-zinc-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}