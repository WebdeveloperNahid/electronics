"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [productId, setProductId] = useState("replace_with_actual_product_uuid");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // ব্যাকএন্ডের লাইভ ইউআরএল এবং /api/orders রুট ব্যবহার করা হয়েছে
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://electronics-backend-ten.vercel.app";
      
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // যদি অথ টোকেন পাঠানোর প্রয়োজন হয়, তবে নিচের মতো করে দিতে পারো:
          // "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          productId,
          quantity: Number(quantity),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      setSuccessMessage("Order placed successfully!");
      setTimeout(() => {
        router.push("/orders");
      }, 1500);
    } catch (err: unknown) {
      // ESLint এর Unexpected any এরর এড়াতে unknown এবং টাইপ ন্যারোইং ব্যবহার করা হলো
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart & Checkout</h1>

      {error && <div className="mb-4 p-4 bg-red-100 text-red-600 rounded">{error}</div>}
      {successMessage && <div className="mb-4 p-4 bg-green-100 text-green-600 rounded">{successMessage}</div>}

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-zinc-200">Checkout Details</h2>
        
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? "Processing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}