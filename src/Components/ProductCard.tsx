"use client";

import { Product } from "@/types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

export default function ProductCard({ product }: { product: Product }) {
  // প্রাইস ফরম্যাটিং
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 p-4 flex flex-col h-full group relative"
    >
      {/* Product Image Area */}
      <Link 
        href={`/products/${product.id}`}
        className="w-full aspect-square bg-[#f8f8f8] mb-4 flex items-center justify-center overflow-hidden relative"
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
          <span className="text-gray-400 text-xs font-light">Product image</span>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-center">
        {/* Category Name */}
        <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          {product.category?.name || "Electronics"}
        </span>

        {/* Product Name */}
        <h3 className="text-gray-800 text-xs font-normal mb-2 truncate">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Product Price */}
        <div className="text-gray-900 font-semibold text-xs mb-3">
          {formattedPrice}
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <Link
            href={`/products/${product.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-gray-800 border border-gray-200 py-2 text-[11px] font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200"
          >
            <FiEye size={13} />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}