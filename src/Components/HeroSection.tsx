"tsx"
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

// ৫টি ইলেকট্রনিক্স প্রোডাক্টের স্লাইড ডাটা
const heroSlides = [
  {
    id: 1,
    title: "WATERPROOF SMARTPHONE",
    subtitle: "NEW FLAGSHIP 5G SERIES",
    description:
      "Experience next-gen performance, ultra-fast connectivity, and stunning professional-grade photography designed for your modern lifestyle.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    price: "$859.00",
  },
  {
    id: 2,
    title: "PRO WIRELESS HEADPHONES",
    subtitle: "ACTIVE NOISE CANCELLATION",
    description:
      "Immerse yourself in crystal-clear studio sound with advanced acoustic architecture and 40-hour battery life for uninterrupted listening.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    price: "$299.00",
  },
  {
    id: 3,
    title: "ULTRA HD SMART TV",
    subtitle: "CINEMATIC 4K DISPLAY",
    description:
      "Bring home the ultimate cinematic experience with vibrant colors, Dolby Atmos sound, and seamless smart streaming features.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
    price: "$1,249.00",
  },
  {
    id: 4,
    title: "SMART WATCH SERIES 8",
    subtitle: "HEALTH & FITNESS TRACKER",
    description:
      "Monitor your health, track workouts, and stay connected on-the-go with a brilliant always-on retina display and sleek aluminum finish.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    price: "$399.00",
  },
  {
    id: 5,
    title: "HIGH-PERFORMANCE LAPTOP",
    subtitle: "POWERED BY M-SERIES CHIP",
    description:
      "Built for creators and professionals. Handle heavy coding, video editing, and multitasking effortlessly with blazing-fast speeds.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    price: "$1,499.00",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // অটো স্লাইড পরিবর্তন (প্রতি ৫ সেকেন্ড পর পর)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#fbfbfb] dark:bg-zinc-950 py-10 md:py-16 border-b border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-sm p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between min-h-[460px]">
          
          {/* Left Side: Product Image & Slider Controls */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full h-[280px] md:h-[340px] flex items-center justify-center"
              >
                <Image
                  src={heroSlides[currentIndex].image}
                  alt={heroSlides[currentIndex].title}
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Previous Arrow Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-gray-800 dark:text-zinc-200 p-2.5 border border-gray-200 dark:border-zinc-700 shadow-md transition-colors z-10"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-gray-800 dark:text-zinc-200 p-2.5 border border-gray-200 dark:border-zinc-700 shadow-md transition-colors z-10"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          {/* Right Side: Animated Text Content & Action */}
          <div className="w-full lg:w-1/2 lg:pl-12 mt-8 lg:mt-0 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <span className="inline-block text-orange-500 font-bold text-xs tracking-widest uppercase mb-2">
                  {heroSlides[currentIndex].subtitle}
                </span>
                
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-4">
                  {heroSlides[currentIndex].title}
                </h1>
                
                <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                  {heroSlides[currentIndex].description}
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {heroSlides[currentIndex].price}
                  </span>
                  <Link
                    href="/products"
                    className="inline-block bg-black dark:bg-white text-white dark:text-black hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white font-medium text-xs tracking-widest uppercase px-8 py-3.5 transition-colors duration-300 shadow-sm"
                  >
                    BUY NOW
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Pagination Dots (Click to change slide directly) */}
            <div className="flex items-center space-x-2 mt-4">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentIndex === idx ? "w-8 bg-orange-500" : "w-2 bg-gray-300 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}