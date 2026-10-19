"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { apiFetch } from "@/lib/api";

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function SectionHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <span className="mb-4 block h-1 w-12 bg-[#FFB900]" />
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Featured products
        </h2>
        <p className="mt-3 max-w-md text-base text-zinc-500 dark:text-zinc-400">
          The newest gadgets added to our store.
        </p>
      </div>
      <Link
        href="/products"
        className="group inline-flex items-center gap-2 border-b-2 border-zinc-900 pb-1 text-sm font-extrabold text-zinc-900 transition-colors hover:border-[#FFB900] hover:text-[#b37f00] dark:border-white dark:text-white dark:hover:border-[#FFB900] dark:hover:text-[#FFB900]"
      >
        View all
        <FiArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-square animate-pulse bg-zinc-100 dark:bg-zinc-800" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-4 w-4/5 animate-pulse bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-6 w-1/3 animate-pulse bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    // ব্যাকএন্ডের রেসপন্স স্ট্রাকচার অনুযায়ী res.data হ্যান্ডেল করা হলো
    apiFetch("/api/products")
      .then((res) => {
        if (cancelled) return;
        if (res?.success && Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res)) {
          setProducts(res);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  // সর্বশেষ ৮টা প্রোডাক্ট দেখানোর জন্য slice করা হলো
  const latestProducts = [...products].slice(-8).reverse();

  return (
    <section
      id="products"
      className="border-t border-zinc-100 bg-zinc-50 py-20 sm:py-24 dark:border-zinc-900 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="border border-red-500/30 bg-red-500/5 px-6 py-14 text-center">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                Could not load products: {error}
              </p>
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="mt-5 bg-[#FFB900] px-6 py-2.5 text-sm font-extrabold text-black transition-colors hover:bg-zinc-900 hover:text-[#FFB900] dark:hover:bg-white dark:hover:text-black"
              >
                Try again
              </button>
            </div>
          ) : latestProducts.length === 0 ? (
            <div className="border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
              <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                No products yet
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                New gadgets will show up here as soon as they are added.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                variants={grid}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
              >
                {latestProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} isNew={i < 2} />
                ))}
              </motion.div>

              <div className="mt-14 flex justify-center">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 border-2 border-zinc-900 px-8 py-3.5 text-sm font-extrabold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB900] dark:border-white/70 dark:text-white dark:hover:border-[#FFB900] dark:hover:bg-[#FFB900] dark:hover:text-black"
                >
                  View more products
                  <FiArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}