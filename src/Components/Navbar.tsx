"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiSearch, FiUser, FiLogOut, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  // হাইড্রেশন এরর এড়ানোর জন্য mounted স্টেট ব্যবহার করা হলো
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl tracking-wider shadow-md group-hover:bg-orange-500 dark:group-hover:bg-orange-500 dark:group-hover:text-white transition-all duration-300">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-gray-900 dark:text-white uppercase leading-none">
              Electro<span className="text-orange-500">Shop</span>
            </span>
            <span className="text-[10px] tracking-widest text-gray-400 dark:text-zinc-500 uppercase font-semibold mt-1">
              Electronics
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-zinc-300">
          <Link href="/" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Products
          </Link>
          
          {mounted && user && (
            <Link href="/orders" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              My Orders
            </Link>
          )}
          {mounted && user?.role === "ADMIN" && (
            <Link href="/admin" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          <button
            aria-label="Search"
            className="text-gray-600 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors p-1"
          >
            <FiSearch size={20} />
          </button>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-gray-600 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors p-1"
          >
            <FiShoppingCart size={20} />
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Real Auth State with Mounted Check */}
          {mounted && (
            user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-zinc-300 hidden lg:inline">
                  Hi, {user.name?.split(" ")[0]}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition-all"
                >
                  <FiLogOut size={16} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-orange-500 px-3 py-2 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-sm"
                  >
                    <FiUser size={16} />
                    Signup
                  </Link>
                </motion.div>
              </div>
            )
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200"
          >
            {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <Link href="/cart" aria-label="Cart" className="relative text-gray-700 dark:text-zinc-200 p-1">
            <FiShoppingCart size={20} />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 dark:text-white p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3 font-medium text-gray-700 dark:text-zinc-300">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">
                Home
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">
                Products
              </Link>
              {mounted && user && (
                <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">
                  My Orders
                </Link>
              )}
              {mounted && user?.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">
                  Admin Dashboard
                </Link>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-3">
              {mounted && (
                user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2.5 rounded-lg text-sm font-medium"
                  >
                    <FiLogOut size={16} /> Logout
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 text-sm font-medium dark:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2.5 rounded-lg bg-orange-500 text-white text-sm font-medium"
                    >
                      Signup
                    </Link>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}