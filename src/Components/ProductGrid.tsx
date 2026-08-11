"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { apiFetch } from "@/lib/api";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ব্যাকএন্ডের রেসপন্স স্ট্রাকচার অনুযায়ী res.data হ্যান্ডেল করা হলো
    apiFetch("/api/products")
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res)) {
          setProducts(res);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-400 dark:text-zinc-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
        Featured products
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-400 dark:text-zinc-500 text-center py-10">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}