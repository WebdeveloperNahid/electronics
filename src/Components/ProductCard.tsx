"use client";

import { Product } from "@/types";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

// Used by the parent grid's stagger (initial="hidden" whileInView="show")
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProductCard({
  product,
  isNew = false,
}: {
  product: Product;
  isNew?: boolean;
}) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col border border-zinc-200 bg-white transition-colors duration-300 hover:border-[#FFB900] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[#FFB900]"
    >
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-500">
            Product image
          </span>
        )}

        {isNew && (
          <span className="absolute left-0 top-3 bg-[#FFB900] px-3 py-1 text-[11px] font-extrabold text-black">
            New
          </span>
        )}

        {/* Hover bar */}
        <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-zinc-900 px-4 py-3 text-xs font-bold text-white transition-transform duration-300 group-hover:translate-y-0 dark:bg-[#FFB900] dark:text-black">
          View details
          <FiArrowUpRight size={16} />
        </span>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {product.category?.name || "Electronics"}
        </span>

        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-100">
          <Link
            href={`/products/${product.id}`}
            className="transition-colors hover:text-[#b37f00] dark:hover:text-[#FFB900]"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <span className="text-lg font-black text-zinc-900 dark:text-white">
            {formattedPrice}
          </span>
          <Link
            href={`/products/${product.id}`}
            aria-label={`View ${product.name}`}
            className="flex h-9 w-9 items-center justify-center bg-zinc-100 text-zinc-900 transition-all duration-300 group-hover:bg-[#FFB900] group-hover:text-black dark:bg-zinc-800 dark:text-white dark:group-hover:text-black"
          >
            <FiArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}