"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/Components/ProductCard";
import { Product } from "@/types";

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
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-400 dark:text-zinc-500">
        Loading all products...
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">All Products</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Explore our latest collection of electronic items.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400 dark:text-zinc-500 text-center py-10">No products available at the moment.</p>
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