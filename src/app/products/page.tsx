"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/Components/ProductGrid";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://electronics-backend-ten.vercel.app";
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        // ব্যাকএন্ডের রেসপন্স ফরম্যাট অনুযায়ী ডাটা সেট করা
        setProducts(data.data || data);
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

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-zinc-400">Loading all products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">All Products</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Explore our latest collection of electronic items.
        </p>
      </div>

      {error && <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>}

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl">
          <p className="text-gray-500 dark:text-zinc-400">No products available at the moment.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}