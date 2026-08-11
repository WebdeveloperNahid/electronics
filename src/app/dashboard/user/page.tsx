"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FiShoppingBag, FiClipboard } from "react-icons/fi";

export default function UserDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Welcome, {user?.name?.split(" ")[0]}
      </h1>
      <p className="text-sm text-gray-400 dark:text-zinc-500 mb-8">Here is your account overview</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/products"
          className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-sm transition-all"
        >
          <FiShoppingBag className="text-orange-500" size={20} />
          <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">Browse Products</span>
        </Link>

        <Link
          href="/dashboard/orders"
          className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-sm transition-all"
        >
          <FiClipboard className="text-orange-500" size={20} />
          <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">My Orders</span>
        </Link>
      </div>
    </div>
  );
}