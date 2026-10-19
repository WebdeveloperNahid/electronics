"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiGrid,
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active: boolean;
  icon?: React.ReactNode;
};

function NavLink({ href, children, active, icon }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative flex items-center gap-1.5 py-2 text-sm font-bold transition-colors ${
        active
          ? "text-black dark:text-[#FFB900]"
          : "text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-[#FFB900]"
      }`}
    >
      {icon}
      {children}
      <span
        className={`absolute -bottom-0.5 left-0 h-[3px] w-full origin-left bg-[#FFB900] transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center text-zinc-700 transition-colors duration-200 hover:bg-[#FFB900] hover:text-black focus-visible:outline-2 focus-visible:outline-[#FFB900] dark:text-zinc-200 dark:hover:bg-[#FFB900] dark:hover:text-black";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only the shadow changes on scroll. The height stays fixed so nothing jumps.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && theme === "dark";
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // role অনুযায়ী সঠিক dashboard route ঠিক করা
  const dashboardHref =
    user?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const mobileLinkClass = (href: string) =>
    `border-l-4 py-2.5 pl-3 text-sm font-bold transition-colors ${
      isActive(href)
        ? "border-[#FFB900] text-black dark:text-[#FFB900]"
        : "border-transparent text-zinc-700 hover:border-[#FFB900] hover:text-black dark:text-zinc-300 dark:hover:text-[#FFB900]"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center bg-[#FFB900] text-xl font-black text-black transition-colors duration-300 group-hover:bg-black group-hover:text-[#FFB900] dark:group-hover:bg-white dark:group-hover:text-black">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase leading-none tracking-wider text-zinc-900 dark:text-white">
              Electro<span className="text-[#FFB900]">Shop</span>
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Electronics
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-9 md:flex">
          <NavLink href="/" active={isActive("/")}>
            Home
          </NavLink>
          <NavLink href="/products" active={isActive("/products")}>
            Products
          </NavLink>

          {/* একটাই "Dashboard" link, role অনুযায়ী সঠিক জায়গায় নিয়ে যায় */}
          {mounted && user && (
            <NavLink
              href={dashboardHref}
              active={isActive("/dashboard")}
              icon={<FiGrid size={15} />}
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-1 md:flex">
          <button type="button" aria-label="Search" className={iconButtonClass}>
            <FiSearch size={19} />
          </button>

          <Link href="/cart" aria-label="Cart" className={iconButtonClass}>
            <FiShoppingCart size={19} />
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={iconButtonClass}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <div className="mx-3 h-6 w-px bg-zinc-200 dark:bg-zinc-700" />

          {mounted &&
            (user ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-sm font-bold text-zinc-800 lg:inline dark:text-zinc-200">
                  Hi, {user.name?.split(" ")[0]}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-500 hover:text-white dark:text-red-400"
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
                    className="group relative px-3 py-2 text-sm font-bold text-zinc-800 transition-colors hover:text-black dark:text-zinc-200 dark:hover:text-[#FFB900]"
                  >
                    Login
                    <span className="absolute bottom-1 left-3 right-3 h-[3px] origin-left scale-x-0 bg-[#FFB900] transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 border-2 border-[#FFB900] bg-[#FFB900] px-5 py-2 text-sm font-extrabold text-black transition-colors hover:bg-black hover:text-[#FFB900] dark:hover:bg-zinc-950"
                  >
                    <FiUser size={16} />
                    Signup
                  </Link>
                </motion.div>
              </div>
            ))}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={iconButtonClass}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <Link href="/cart" aria-label="Cart" className={iconButtonClass}>
            <FiShoppingCart size={20} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={iconButtonClass}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* One soft shadow, fades in after scrolling (no jump) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-px shadow-[0_8px_20px_-6px_rgba(0,0,0,0.14)] transition-opacity duration-300 dark:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="space-y-4 px-6 py-5">
              <div className="flex flex-col">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileLinkClass("/")}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileLinkClass("/products")}
                >
                  Products
                </Link>
                {mounted && user && (
                  <Link
                    href={dashboardHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileLinkClass("/dashboard")}
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                {mounted &&
                  (user ? (
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 bg-red-500 py-3 text-sm font-bold text-white"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 border-2 border-zinc-300 py-3 text-center text-sm font-bold text-zinc-900 transition-colors hover:border-[#FFB900] dark:border-zinc-700 dark:text-white dark:hover:border-[#FFB900]"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 border-2 border-[#FFB900] bg-[#FFB900] py-3 text-center text-sm font-extrabold text-black"
                      >
                        Signup
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}