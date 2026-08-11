"use client";

import { Product } from "@/types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

export default function ProductCard({ product }: { product: Product }) {
  // প্রাইস ফরম্যাটিং
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 flex flex-col h-full group relative transition-colors"
    >
      {/* Product Image Area */}
      <Link
        href={`/products/${product.id}`}
        className="w-full aspect-square bg-[#f8f8f8] dark:bg-zinc-800 mb-4 flex items-center justify-center overflow-hidden relative"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-gray-400 dark:text-zinc-500 text-xs font-light">
            Product image
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-center">
        {/* Category Name */}
        <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
          {product.category?.name || "Electronics"}
        </span>

        {/* Product Name */}
        <h3 className="text-gray-800 dark:text-zinc-200 text-xs font-normal mb-2 truncate">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Product Price */}
        <div className="text-gray-900 dark:text-white font-semibold text-xs mb-3">
          {formattedPrice}
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-2 border-t border-gray-100 dark:border-zinc-800">
          <Link
            href={`/products/${product.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-gray-900 dark:bg-zinc-900 text-white dark:text-zinc-200 border border-gray-200 dark:border-zinc-700 py-2 text-[11px] font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 transition-colors duration-200"
          >
            <FiEye size={13} />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
