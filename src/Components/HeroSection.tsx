"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi";

// Each slide (image + text) stays this many seconds, then changes automatically
const SLIDE_DURATION = 2;
const EASE = [0.22, 1, 0.36, 1] as const;

type Slide = {
  id: number;
  category: string;
  lines: [string, string];
  text: string;
  name: string;
  price: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    category: "Audio",
    lines: ["Sound that", "moves with you."],
    text: "Immersive sound with active noise cancellation.",
    name: "Pro Wireless Headphones",
    price: "$299.00",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Smartphones",
    lines: ["Flagship power,", "pocket size."],
    text: "The new 5G series, built for everyday life.",
    name: "Waterproof Smartphone",
    price: "$859.00",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "TV and displays",
    lines: ["Cinema at", "home, in 4K."],
    text: "Crisp picture that turns movie night into an event.",
    name: "Ultra HD Smart TV",
    price: "$1,249.00",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Smart watches",
    lines: ["Your whole day,", "on your wrist."],
    text: "Track workouts, sleep and notifications at a glance.",
    name: "Smart Watch Series 8",
    price: "$399.00",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
  },
];

const TRUST = [
  "100% original products",
  "Fast and safe delivery",
  "24/7 customer support",
];

const MARQUEE_ITEMS = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Smart watches",
  "Cameras",
  "Gaming",
  "Accessories",
];

const TOTAL = SLIDES.length;

const textWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const lineUp: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

function MarqueeRow({ ariaHidden }: { ariaHidden?: boolean }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((text, i) => (
        <div key={`${text}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-7 text-sm font-extrabold text-[#FFB900] dark:text-black">
            {text}
          </span>
          <span className="h-2 w-2 rotate-45 bg-white dark:bg-black" />
        </div>
      ))}
    </div>
  );
}

function Marquee({ animate }: { animate: boolean }) {
  return (
    <div className="relative overflow-hidden bg-zinc-950 py-3 dark:bg-[#FFB900]">
      <motion.div
        className="flex w-max"
        animate={animate ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={
          animate
            ? { duration: 34, ease: "linear", repeat: Infinity }
            : { duration: 0 }
        }
      >
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = SLIDES[index];
  const next = () => setIndex((p) => (p + 1) % TOTAL);

  // Press and hold (mouse or finger) pauses; release resumes
  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  // The progress bar drives timing: when its animation ends, go to the next slide.
  // Pausing the animation pauses the slide, so it resumes exactly where it stopped.
  const renderFill = (className: string) => (
    <span
      className={`absolute origin-left bg-[#FFB900] ${className}`}
      style={
        reduceMotion
          ? { transform: "scaleX(1)" }
          : {
              animation: `heroFill ${SLIDE_DURATION}s linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }
      }
      onAnimationEnd={(e) => {
        if (e.animationName === "heroFill") next();
      }}
    />
  );

  return (
    <section
      onPointerDown={hold}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="relative select-none overflow-hidden bg-zinc-50 transition-colors duration-300 [-webkit-touch-callout:none] dark:bg-zinc-950"
    >
      <style>{`@keyframes heroFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

      <div className="grid lg:min-h-[680px] lg:grid-cols-[1fr_1.05fr]">
        {/* ============ Left: text ============ */}
        <div className="relative order-2 flex flex-col justify-center overflow-hidden px-4 py-12 sm:px-6 lg:order-1 lg:py-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-10">
          {/* Giant outline slide number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${slide.id}`}
              aria-hidden="true"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: reduceMotion ? 0 : 0.5 }}
              className="pointer-events-none absolute -bottom-10 right-2 hidden text-[17rem] font-black leading-none text-transparent [--stroke:rgba(24,24,27,0.14)] lg:block dark:[--stroke:rgba(255,255,255,0.14)]"
              style={{ WebkitTextStroke: "2px var(--stroke)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>

          <div className="relative z-10">
            {/* Counter */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-black tabular-nums text-zinc-950 dark:text-white">
                <span className="bg-[#FFB900] px-2 py-1 text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  / {String(TOTAL).padStart(2, "0")}
                </span>
              </span>
              <span className="h-px w-14 bg-zinc-400 dark:bg-zinc-600" />
              <AnimatePresence>
                {paused && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-2 border-zinc-950 bg-[#FFB900] px-2 py-0.5 text-xs font-extrabold text-black"
                  >
                    Paused
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Changing text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${slide.id}`}
                variants={textWrap}
                initial="hidden"
                animate="show"
                exit="exit"
                className="mt-7"
              >
                <motion.span
                  variants={rise}
                  className="inline-flex items-center gap-2.5 text-sm font-extrabold text-zinc-950 dark:text-white"
                >
                  <span className="h-3 w-3 bg-[#FFB900]" />
                  {slide.category}
                </motion.span>

                <h1 className="mt-4 text-4xl font-black leading-[1.04] tracking-tight text-zinc-950 [--ink:#09090b] sm:text-5xl xl:text-6xl 2xl:text-7xl dark:text-white dark:[--ink:#ffffff]">
                  <span className="block overflow-hidden pb-1.5">
                    <motion.span variants={lineUp} className="block">
                      {slide.lines[0]}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-2">
                    <motion.span
                      variants={lineUp}
                      className="block text-transparent"
                      style={{ WebkitTextStroke: "2px var(--ink)" }}
                    >
                      {slide.lines[1]}
                    </motion.span>
                  </span>
                </h1>

                <motion.p
                  variants={rise}
                  className="mt-5 min-h-[3.25rem] max-w-md text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300"
                >
                  {slide.text}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <Link
                href={`/products?category=${encodeURIComponent(slide.category)}`}
                className="group inline-flex items-center gap-3 bg-[#FFB900] px-8 py-4 text-sm font-extrabold text-black shadow-[6px_6px_0_0_#18181b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#18181b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB900] dark:shadow-[6px_6px_0_0_#ffffff33] dark:hover:shadow-[3px_3px_0_0_#ffffff33]"
              >
                Shop now
                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/products"
                className="border-2 border-zinc-950 px-8 py-3.5 text-sm font-extrabold text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB900] dark:border-white/70 dark:text-white dark:hover:border-[#FFB900] dark:hover:bg-[#FFB900] dark:hover:text-black"
              >
                View all products
              </Link>
            </motion.div>

            {/* Trust */}
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t-2 border-zinc-950 pt-5 dark:border-zinc-700">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200"
                >
                  <span className="flex h-5 w-5 items-center justify-center bg-zinc-950 text-[#FFB900] dark:bg-[#FFB900] dark:text-black">
                    <FiCheck size={13} strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ Right: image panel ============ */}
        <div className="relative order-1 h-[380px] sm:h-[480px] lg:order-2 lg:h-auto">
          {/* Yellow diagonal edge */}
          <div className="absolute inset-0 bg-[#FFB900] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]" />

          {/* Images */}
          <div className="absolute inset-x-0 top-0 bottom-3 overflow-hidden bg-zinc-900 lg:inset-0 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,4%_100%)]">
            {SLIDES.map((s, i) => (
              <motion.div
                key={s.id}
                aria-hidden={i !== index}
                className="absolute inset-0"
                style={{ zIndex: i === index ? 1 : 0 }}
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1 : 1.14,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        opacity: { duration: 0.7, ease: "easeInOut" },
                        scale: { duration: 2.8, ease: "easeOut" },
                      }
                }
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  draggable={false}
                  className="object-cover object-center"
                />
              </motion.div>
            ))}
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/50 via-transparent to-black/20" />
          </div>

          {/* Price card */}
          <div className="absolute bottom-12 left-4 z-20 w-[calc(100%-2rem)] sm:w-80 lg:bottom-8 lg:left-[24%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${slide.id}`}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, delay: 0.1 }}
                className="flex items-center justify-between gap-4 bg-white p-4 text-black shadow-[8px_8px_0_0_#18181b] dark:bg-zinc-900 dark:text-white dark:shadow-[8px_8px_0_0_#FFB900]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold sm:text-base">
                    {slide.name}
                  </p>
                  <p className="text-sm font-black text-[#b37f00] dark:text-[#FFB900]">
                    {slide.price}
                  </p>
                </div>
                <Link
                  href="/products"
                  aria-label={`View ${slide.name}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#FFB900] text-black transition-colors hover:bg-black hover:text-[#FFB900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB900] dark:hover:bg-white dark:hover:text-black"
                >
                  <FiArrowUpRight size={20} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop: thumbnails with progress */}
          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === index}
                className={`relative h-16 w-16 overflow-hidden border-2 transition-all duration-300 ${
                  i === index
                    ? "scale-110 border-[#FFB900]"
                    : "border-white opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={s.image} alt="" fill sizes="64px" className="object-cover" />
                {i === index && renderFill("inset-x-0 bottom-0 h-1")}
              </button>
            ))}
          </div>

          {/* Mobile: progress bars */}
          <div className="absolute inset-x-4 bottom-6 z-20 flex gap-2 sm:inset-x-6 lg:hidden">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === index}
                className="relative h-1.5 flex-1 overflow-hidden bg-white/40"
              >
                {i === index && renderFill("inset-0")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Marquee animate={!reduceMotion} />
    </section>
  );
}