"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiUser,
  FiTruck,
  FiHeadphones,
  FiSmartphone,
  FiWatch,
  FiCamera,
  FiTv,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { IoLaptopOutline, IoGameControllerOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import bgElectronics from "@/assets/images/bg-electronics.png";
import loginSideImage from "@/assets/images/loginpage.png";

const DEMO_ACCOUNTS = [
  {
    label: "Demo Admin",
    description: "Manage products, orders and stats",
    email: "admin@gmail.com",
    password: "12345678",
    icon: FiShield,
  },
  {
    label: "Demo Customer",
    description: "Browse, add to cart and checkout",
    email: "nahid@gmail.com",
    password: "11111111",
    icon: FiUser,
  },
] as const;

const TRUST_BADGES = [
  { icon: FiShield, title: "100%", subtitle: "Original Products" },
  { icon: FiTruck, title: "Fast & Safe", subtitle: "Delivery" },
  { icon: FiHeadphones, title: "24/7", subtitle: "Customer Support" },
] as const;

const CATEGORIES = [
  { icon: FiSmartphone, label: "Mobile Phones" },
  { icon: IoLaptopOutline, label: "Laptops" },
  { icon: FiHeadphones, label: "Headphones" },
  { icon: FiWatch, label: "Smart Watches" },
  { icon: FiCamera, label: "Cameras" },
  { icon: FiTv, label: "TV & Appliances" },
  { icon: IoGameControllerOutline, label: "Gaming" },
  { icon: FiZap, label: "Accessories" },
] as const;

const inputWrapperClass =
  "flex items-center gap-3 border border-zinc-300 bg-white px-4 py-3 transition-colors focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-400/25 dark:border-zinc-700 dark:bg-zinc-950";

const inputClass =
  "w-full bg-transparent text-sm text-[#0B1F4B] outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600";

function Brand({ onImage = false }: { onImage?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center bg-amber-400 text-xl font-extrabold text-[#0B1F4B]">
        E
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-xl font-extrabold ${
            onImage ? "text-white" : "text-[#0B1F4B] dark:text-white"
          }`}
        >
          ELECTRO<span className="text-amber-400">SHOP</span>
        </span>
        <span
          className={`mt-1 text-[11px] ${
            onImage ? "text-white/85" : "text-slate-500 dark:text-zinc-400"
          }`}
        >
          Smart Devices • Better Life
        </span>
      </span>
    </div>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const performLogin = async (loginEmail: string, loginPassword: string) => {
    setError("");
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performLogin(email, password);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    await performLogin(demoEmail, demoPassword);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      {/* Page background image (sharp, dark + golden tint) */}
      <Image
        src={bgElectronics}
        alt=""
        fill
        priority
        quality={70}
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/30 via-transparent to-black/40" />

      {/* Single card (square corners) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative grid w-full max-w-[1400px] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 md:min-h-[80vh] md:w-[80vw] md:grid-cols-[1.25fr_1fr] dark:shadow-black/70"
      >
        {/* Left: image + intro */}
        <aside className="relative min-h-72 md:min-h-0">
          <Image
            src={loginSideImage}
            alt="Electronics gadgets"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/33 to-black/70 dark:from-black/75 dark:via-black/35 dark:to-black/75" />

          <div className="relative flex h-full flex-col justify-between gap-8 p-6 sm:p-10">
            <div>
              <Link href="/" className="inline-block">
                <Brand onImage />
              </Link>

              <h2 className="mt-8 max-w-md text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
                All Your <span className="text-amber-400">Electronics</span>{" "}
                Needs in One Place
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/95 drop-shadow-md sm:text-base">
                Latest gadgets, top brands, best prices. Shop smart, live
                better.
              </p>

              <ul className="mt-6 hidden flex-wrap gap-x-6 gap-y-3 md:flex">
                {TRUST_BADGES.map(({ icon: Icon, title, subtitle }) => (
                  <li key={title} className="flex items-center gap-2.5">
                    <Icon size={22} className="shrink-0 text-amber-400" />
                    <span className="flex flex-col text-xs leading-tight drop-shadow">
                      <span className="font-bold text-white">{title}</span>
                      <span className="text-white/85">{subtitle}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block">
              <ul className="grid grid-cols-4 gap-px bg-slate-200/70 shadow-xl shadow-black/30 dark:bg-zinc-700/60">
                {CATEGORIES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex flex-col items-center gap-2 bg-white/95 px-2 py-4 text-center backdrop-blur-md dark:bg-zinc-900/85"
                  >
                    <span className="flex h-10 w-10 items-center justify-center bg-amber-400/20 text-[#0B1F4B] dark:text-amber-400">
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-semibold text-[#0B1F4B] dark:text-white">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center text-sm font-medium italic text-amber-300 drop-shadow">
                Your Trusted Electronics Partner
              </p>
            </div>
          </div>
        </aside>

        {/* Right: login form */}
        <main className="flex items-center justify-center bg-white p-6 sm:p-10 lg:p-14 dark:bg-zinc-900">
          <div className="w-full max-w-md">
            <div className="mb-8 hidden justify-center md:flex">
              <Brand />
            </div>

            <h1 className="text-3xl font-extrabold text-[#0B1F4B] dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
              Log in to your account and continue shopping for your favorite
              electronics.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
              >
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#0B1F4B] dark:text-zinc-300"
                >
                  Email Address
                </label>
                <div className={inputWrapperClass}>
                  <FiMail
                    className="text-[#0B1F4B] dark:text-zinc-500"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#0B1F4B] dark:text-zinc-300"
                >
                  Password
                </label>
                <div className={inputWrapperClass}>
                  <FiLock
                    className="text-[#0B1F4B] dark:text-zinc-500"
                    size={18}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="p-1 text-zinc-400 transition-colors hover:text-[#0B1F4B] focus-visible:outline-2 focus-visible:outline-amber-500 dark:text-zinc-500 dark:hover:text-zinc-200"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-1 flex items-center justify-center gap-2 bg-amber-400 py-3.5 text-sm font-bold text-[#0B1F4B] shadow-md shadow-amber-500/30 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiArrowRight size={18} />
                {loading ? "Logging in..." : "Log In"}
              </motion.button>
            </form>

            {/* Demo accounts */}
            <div className="mt-8">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-xs text-slate-500 dark:text-zinc-400">
                  OR LOG IN WITH A DEMO ACCOUNT
                </span>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {DEMO_ACCOUNTS.map(
                  ({
                    label,
                    description,
                    email: demoEmail,
                    password: demoPassword,
                    icon: Icon,
                  }) => (
                    <motion.button
                      key={label}
                      whileTap={{ scale: 0.99 }}
                      type="button"
                      disabled={loading}
                      onClick={() => handleDemoLogin(demoEmail, demoPassword)}
                      className="flex items-center gap-4 border border-zinc-300 bg-white p-3.5 text-left transition-colors hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-amber-500"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-400/20 text-[#0B1F4B] dark:text-amber-400">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[#0B1F4B] dark:text-white">
                          {label}
                        </span>
                        <span className="block truncate text-xs text-slate-500 dark:text-zinc-400">
                          {description}
                        </span>
                      </span>
                    </motion.button>
                  )
                )}
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-amber-600 hover:underline dark:text-amber-400"
              >
                Create one
              </Link>
            </p>
          </div>
        </main>
      </motion.div>
    </div>
  );
}  
  