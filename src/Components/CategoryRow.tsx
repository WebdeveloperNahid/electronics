"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Category = {
  label: string;
  tagline: string;
  image: string;
  itemCount: string;
};

const categories: Category[] = [
  {
    label: "Laptops",
    tagline: "Work, create & play",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    itemCount: "120+ Items",
  },
  {
    label: "Smartphones",
    tagline: "Latest flagships",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    itemCount: "85+ Items",
  },
  {
    label: "Audio",
    tagline: "Headphones & speakers",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    itemCount: "64+ Items",
  },
  {
    label: "Smart Watches",
    tagline: "Track & connect",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    itemCount: "45+ Items",
  },
  {
    label: "TV & Displays",
    tagline: "4K & Beyond views",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop",
    itemCount: "30+ Items",
  },
  {
    label: "Gaming Gear",
    tagline: "Pro consoles & gear",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=600&auto=format&fit=crop",
    itemCount: "50+ Items",
  },
];

export default function CategoryRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-14 sm:py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#FFB900]/15 px-3 py-1 text-xs font-bold text-[#b37f00] dark:text-[#FFB900]">
              <span className="h-2 w-2 rounded-full bg-[#FFB900]" />
              Explore Collections
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#FFB900] hover:text-black dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-[#FFB900]"
          >
            Browse All
            <FiArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Carousel Container with Left/Right Absolute Scroll Buttons */}
        <div className="relative mt-8">
          
          {/* Left Scroll Button (Absolute Positioned on Left Side) */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="absolute -left-3 sm:-left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-800 shadow-md backdrop-blur-md transition-all hover:border-[#FFB900] hover:bg-[#FFB900] hover:text-black active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* Right Scroll Button (Absolute Positioned on Right Side) */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="absolute -right-3 sm:-right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-800 shadow-md backdrop-blur-md transition-all hover:border-[#FFB900] hover:bg-[#FFB900] hover:text-black active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200"
          >
            <FiChevronRight size={22} />
          </button>

          {/* Circular Left-to-Right Slider */}
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth px-2 pb-6 pt-2 sm:gap-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex shrink-0 flex-col items-center"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(cat.label)}`}
                  className="group flex flex-col items-center text-center focus:outline-none"
                >
                  {/* Outer Glow & Circle Avatar Container */}
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-zinc-300 p-1.5 transition-all duration-500 group-hover:border-[#FFB900] group-hover:shadow-[0_0_25px_rgba(255,185,0,0.35)] sm:h-44 sm:w-44 dark:border-zinc-700">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        sizes="(max-width: 640px) 130px, 180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* Floating Item Count Badge */}
                    <span className="absolute -bottom-1 rounded-full bg-zinc-900 px-2.5 py-0.5 text-[9px] font-bold text-white shadow-md transition-colors group-hover:bg-[#FFB900] group-hover:text-black sm:px-3 sm:py-1 sm:text-[10px] dark:bg-zinc-100 dark:text-zinc-900">
                      {cat.itemCount}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="mt-3.5 max-w-[130px] sm:mt-4 sm:max-w-[180px]">
                    <h3 className="text-sm font-extrabold text-zinc-900 transition-colors group-hover:text-[#b37f00] sm:text-lg dark:text-white dark:group-hover:text-[#FFB900]">
                      {cat.label}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-500 sm:text-xs dark:text-zinc-400">
                      {cat.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}