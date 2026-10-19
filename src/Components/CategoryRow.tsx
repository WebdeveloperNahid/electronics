"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

type Category = {
  label: string;
  tagline: string;
  image: string;
  className: string;
};

const categories: Category[] = [
  {
    label: "Laptops",
    tagline: "Work, create and play anywhere",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-2 row-span-2",
  },
  {
    label: "Smartphones",
    tagline: "Latest flagships",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
  {
    label: "Audio",
    tagline: "Headphones and speakers",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
  {
    label: "Smart watches",
    tagline: "Track, pay and connect",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
  {
    label: "TV and displays",
    tagline: "4K and beyond",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=900&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CategoryRow() {
  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-4 block h-1 w-12 bg-[#FFB900]" />
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Shop by category
            </h2>
            <p className="mt-3 max-w-md text-base text-zinc-500 dark:text-zinc-400">
              Find exactly what you are looking for.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border-b-2 border-zinc-900 pb-1 text-sm font-extrabold text-zinc-900 transition-colors hover:border-[#FFB900] hover:text-[#b37f00] dark:border-white dark:text-white dark:hover:border-[#FFB900] dark:hover:text-[#FFB900]"
          >
            Browse everything
            <FiArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:gap-4 lg:grid-cols-4"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              variants={tile}
              className={`${cat.className} ${
                i === 0 ? "col-span-2 row-span-2 lg:col-span-2" : ""
              }`}
            >
              <Link
                href={`/products?category=${encodeURIComponent(cat.label)}`}
                className="group relative block h-full w-full overflow-hidden bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB900] dark:bg-zinc-800"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover object-center saturate-[0.85] transition-all duration-700 group-hover:scale-110 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0">
                    <span className="block text-lg font-extrabold text-white sm:text-xl lg:text-2xl">
                      {cat.label}
                    </span>
                    {/* Tagline slides up on hover */}
                    <span className="block max-h-0 translate-y-2 overflow-hidden text-xs text-zinc-200 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                      {cat.tagline}
                    </span>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FFB900] text-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-11 sm:w-11">
                    <FiArrowUpRight size={20} />
                  </span>
                </div>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#FFB900] transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}