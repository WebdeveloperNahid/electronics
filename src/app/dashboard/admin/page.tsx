"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiBox, FiClipboard, FiPlusCircle } from "react-icons/fi";
import { apiFetch } from "@/lib/api";
import { Product, Order } from "@/types";

export default function AdminPage() {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          apiFetch("/api/products"),
          apiFetch("/api/orders"),
        ]);

        const products: Product[] = productsRes?.data || [];
        const orders: Order[] = ordersRes?.data || [];

        setProductCount(products.length);
        setOrderCount(orders.length);
        setPendingCount(orders.filter((o) => o.status === "PENDING").length);
      } catch (err) {
        // stats load fail হলেও page ভেঙে যাবে না, শুধু "-" দেখাবে
        console.error("Failed to load dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { label: "Total Products", value: productCount, icon: FiBox },
    { label: "Total Orders", value: orderCount, icon: FiClipboard },
    { label: "Pending Orders", value: pendingCount, icon: FiClipboard },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
      <p className="text-sm text-gray-400 mb-8">Overview of your store</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              <stat.icon className="text-orange-500" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">
                {stat.value === null ? "-" : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products/add"
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-5 hover:border-orange-300 hover:shadow-sm transition-all"
        >
          <FiPlusCircle className="text-orange-500" size={20} />
          <span className="text-sm font-medium text-gray-800">Add Product</span>
        </Link>

        <Link
          href="/admin/products"
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-5 hover:border-orange-300 hover:shadow-sm transition-all"
        >
          <FiBox className="text-orange-500" size={20} />
          <span className="text-sm font-medium text-gray-800">View All Products</span>
        </Link>

        <Link
          href="/admin/orders"
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-5 hover:border-orange-300 hover:shadow-sm transition-all"
        >
          <FiClipboard className="text-orange-500" size={20} />
          <span className="text-sm font-medium text-gray-800">Order History</span>
        </Link>
      </div>
    </div>
  );
}