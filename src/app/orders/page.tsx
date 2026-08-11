"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

interface Order {
  id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  product?: {
    name: string;
    price: number;
  };
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // auth context এখনো loading হলে অপেক্ষা করো, নাইলে সময়ের আগেই redirect হয়ে যাবে
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        // apiFetch localStorage থেকে token নিয়ে Authorization header এ পাঠায় automatically
        const res = await apiFetch("/api/orders");
        setOrders(res?.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-zinc-400">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Orders</h1>

      {error && <div className="mb-4 p-4 bg-red-100 text-red-600 rounded">{error}</div>}

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl">
          <p className="text-gray-500 dark:text-zinc-400 mb-4">You have not placed any orders yet.</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
                  {order.product?.name || "Electronics Product"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Order ID: <span className="font-mono">{order.id}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Quantity: <span className="font-medium text-gray-700 dark:text-zinc-300">{order.quantity}</span> | Total Price: <span className="font-medium text-orange-500">${order.totalPrice}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : order.status === "PROCESSING"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}