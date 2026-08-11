"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FiHome,
  FiPlusCircle,
  FiBox,
  FiClipboard,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";

type NavItem = {
  icon: IconType;
  label: string;
  href: string;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = !loading && user?.role === "ADMIN";

  const customerItems: NavItem[] = [
    { icon: FiHome, label: "Home", href: "/dashboard/user" },
    { icon: FiBox, label: "View All Products", href: "/products" },
    { icon: FiClipboard, label: "My Orders", href: "/dashboard/orders" },
    { icon: FiUser, label: "Profile", href: "/dashboard/user/profile" },
  ];

  const adminItems: NavItem[] = [
    { icon: FiHome, label: "Home", href: "/dashboard/admin" },
    {
      icon: FiPlusCircle,
      label: "Add Product",
      href: "/dashboard/admin/add-products",
    },
    { icon: FiBox, label: "Products List ", href: "/dashboard/admin/products-list" },
    { icon: FiClipboard, label: "Order History", href: "/dashboard/orders" },
  ];

  const items = isAdmin ? adminItems : customerItems;

  const renderLinks = (list: NavItem[]) => (
    <nav className="flex flex-col gap-1">
      {list.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`group relative flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-800 dark:hover:text-zinc-200"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-orange-500 transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <item.icon
              size={16}
              className={isActive ? "text-orange-500" : "text-gray-400 dark:text-zinc-500"}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const NavContent = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
          {isAdmin ? "Admin" : "Customer"}
        </p>
        {renderLinks(items)}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-56 flex-shrink-0 border-r border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-4 lg:block">
        {NavContent}
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="fixed top-21 left-4 z-40 flex items-center justify-center rounded-full bg-orange-500 p-3 text-white shadow-lg lg:hidden"
      >
        <FiMenu size={20} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-zinc-900 px-3 py-4 shadow-xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
                >
                  <FiX size={20} />
                </button>
              </div>
              {NavContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}