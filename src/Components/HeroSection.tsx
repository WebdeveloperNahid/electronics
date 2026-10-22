"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  FiArrowDownRight,
  FiArrowRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiHeadphones,
  FiRefreshCw,
  FiShield,
  FiTruck,
} from "react-icons/fi";

type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  category: string;
  product: string;
  price: string;
  oldPrice: string;
  discount: string;
  tag: string;
  image: string;
  accent: string;
};

const slides: HeroSlide[] = [
  {
    id: "audio",
    eyebrow: "NEXT-LEVEL SOUND",
    title: "Feel Every",
    highlight: "Beat.",
    description:
      "Discover immersive audio, rich bass, and crystal-clear sound designed for every moment.",
    category: "Audio",
    product: "Premium Wireless Headphones",
    price: "$129.00",
    oldPrice: "$169.00",
    discount: "24%",
    tag: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    accent: "#FFB900",
  },
  {
    id: "smartphones",
    eyebrow: "SMARTER EVERY DAY",
    title: "Power in",
    highlight: "Your Hands.",
    description:
      "Explore powerful smartphones with stunning displays, brilliant cameras, and effortless performance.",
    category: "Smartphones",
    product: "Next-Gen Smartphone",
    price: "$699.00",
    oldPrice: "$799.00",
    discount: "12%",
    tag: "TOP PICK",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85",
    accent: "#38BDF8",
  },
  {
    id: "smartwatches",
    eyebrow: "YOUR DAY, UPGRADED",
    title: "Stay Ahead.",
    highlight: "Stay Connected.",
    description:
      "Track your goals, manage your day, and keep your essentials close with smart wearable technology.",
    category: "Smart Watches",
    product: "Smart Fitness Watch",
    price: "$189.00",
    oldPrice: "$229.00",
    discount: "17%",
    tag: "SMART CHOICE",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
    accent: "#34D399",
  },
  {
    id: "laptops",
    eyebrow: "BUILT FOR BIG IDEAS",
    title: "Work Smart.",
    highlight: "Go Further.",
    description:
      "Upgrade your setup with modern laptops made for productivity, creativity, and everyday performance.",
    category: "Laptops",
    product: "Performance Laptop",
    price: "$999.00",
    oldPrice: "$1,199.00",
    discount: "17%",
    tag: "PRO PERFORMANCE",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    accent: "#A78BFA",
  },
  {
    id: "gaming",
    eyebrow: "LEVEL UP YOUR PLAY",
    title: "Game On.",
    highlight: "No Limits.",
    description:
      "Bring your gaming setup to life with immersive gear built for precision, comfort, and fun.",
    category: "Gaming",
    product: "Pro Gaming Headset",
    price: "$149.00",
    oldPrice: "$189.00",
    discount: "21%",
    tag: "GAMER FAVORITE",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1000&q=85",
    accent: "#F0ABFC",
  },
  {
    id: "displays",
    eyebrow: "A BETTER VIEW",
    title: "See More.",
    highlight: "Feel More.",
    description:
      "Transform your entertainment space with vivid visuals and a more immersive viewing experience.",
    category: "TV & Displays",
    product: "Ultra HD Smart Display",
    price: "$549.00",
    oldPrice: "$649.00",
    discount: "15%",
    tag: "HOME FAVORITE",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=85",
    accent: "#22D3EE",
  },
];

const benefits = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description: "Delivery options at checkout",
  },
  {
    icon: FiShield,
    title: "Secure Checkout",
    description: "Shop with confidence",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "Hassle-free returns",
  },
  {
    icon: FiHeadphones,
    title: "Customer Support",
    description: "We're here to help",
  },
];

const INTERVAL = 5000;
const TICK = 50;

const THEME_VARS = [
  "[--h-bg:#FFFFFF]",
  "[--h-fg:#09090B]",
  "[--h-muted:#27272A]",
  "[--h-subtle:#52525B]",
  "[--h-surface:#FFFFFF]",
  "[--h-border:#A1A1AA]",
  "[--h-track:#D4D4D8]",
  "[--h-dot:#A1A1AA]",
  "[--h-shadow:#18181B]",
  "[--h-icon:#09090B]",
  "[--h-ghost:rgba(82,82,91,0.35)]",
  "dark:[--h-bg:#09090B]",
  "dark:[--h-fg:#FFFFFF]",
  "dark:[--h-muted:#E4E4E7]",
  "dark:[--h-subtle:#A1A1AA]",
  "dark:[--h-surface:#18181B]",
  "dark:[--h-border:rgba(255,255,255,0.22)]",
  "dark:[--h-track:rgba(255,255,255,0.15)]",
  "dark:[--h-dot:rgba(255,255,255,0.3)]",
  "dark:[--h-shadow:rgba(255,255,255,0.25)]",
  "dark:[--h-icon:#FFCA3A]",
  "dark:[--h-ghost:rgba(255,255,255,0.18)]",
].join(" ");

const fg: CSSProperties = { color: "var(--h-fg)" };
const muted: CSSProperties = { color: "var(--h-muted)" };
const subtle: CSSProperties = { color: "var(--h-subtle)" };
const btnFg: CSSProperties = { color: "var(--btn-fg, var(--h-fg))" };

const textContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const progressRef = useRef(0);

  const activeSlide = slides[activeIndex];
  const isPaused = pressed || pageHidden || Boolean(shouldReduceMotion);

  const goToSlide = useCallback((index: number) => {
    progressRef.current = 0;
    setProgress(0);
    setActiveIndex((index + slides.length) % slides.length);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const onVisibility = () => {
      setPageHidden(document.visibilityState === "hidden");
    };

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const release = () => setPressed(false);

    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);

    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let last = performance.now();

    const timer = window.setInterval(() => {
      const now = performance.now();
      progressRef.current += ((now - last) / INTERVAL) * 100;
      last = now;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setActiveIndex((current) => (current + 1) % slides.length);
        return;
      }

      setProgress(progressRef.current);
    }, TICK);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const next = slides[(activeIndex + 1) % slides.length];
    const preloader = new window.Image();
    preloader.src = next.image;
  }, [activeIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") previousSlide();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextSlide, previousSlide]);

  const markImageFailed = (id: string) => {
    setFailedImages((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  const visualTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: "easeOut" as const };

  return (
    <section
      aria-label="Featured electronics"
      aria-roledescription="carousel"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onDragStart={(event) => event.preventDefault()}
      style={{ backgroundColor: "var(--h-bg)", color: "var(--h-fg)" }}
      className={`relative isolate overflow-hidden ${THEME_VARS}`}
    >
      {/* Soft slide tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-700"
        style={{
          background: `linear-gradient(120deg, ${activeSlide.accent}24 0%, transparent 55%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full opacity-20 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: activeSlide.accent }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-10 lg:pt-12">
        {/* Main hero */}
        <div className="grid items-center gap-10 lg:min-h-[480px] lg:grid-cols-2 lg:gap-14">
          {/* Text content */}
          <div className="relative z-10 order-2 flex flex-col items-start lg:order-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide.id}
                variants={textContainer}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="show"
                exit={shouldReduceMotion ? undefined : "exit"}
                className="w-full"
              >
                <motion.div
                  variants={textItem}
                  style={{ backgroundColor: "var(--h-surface)" }}
                  className="mb-5 inline-flex items-center gap-2.5 border border-[#E0A000] px-3.5 py-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB900] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E0A000]" />
                  </span>
                  <span
                    style={fg}
                    className="text-[10px] font-extrabold tracking-[0.22em] sm:text-xs"
                  >
                    {activeSlide.eyebrow}
                  </span>
                </motion.div>

                <motion.h1
                  variants={textItem}
                  style={fg}
                  className="max-w-xl text-[clamp(2.5rem,5.4vw,4.7rem)] font-black leading-[1.02] tracking-[-0.055em]"
                >
                  {activeSlide.title}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{activeSlide.highlight}</span>
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-[0.04em] left-0 z-0 h-[0.14em] w-full origin-left"
                      style={{ backgroundColor: activeSlide.accent }}
                      initial={shouldReduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.4,
                        duration: shouldReduceMotion ? 0 : 0.5,
                        ease: "easeOut",
                      }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  variants={textItem}
                  style={muted}
                  className="mt-6 max-w-lg border-l-2 border-[#FFB900] pl-4 text-sm font-medium leading-7 sm:text-base sm:leading-8"
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div
                  variants={textItem}
                  className="mt-7 flex flex-wrap items-center gap-3"
                >
                  <Link
                    href={`/products?category=${encodeURIComponent(activeSlide.category)}`}
                    style={{ color: "#18181B" }}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFB900] px-6 py-3 text-sm font-bold shadow-[4px_4px_0_var(--h-shadow)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FFC62E] hover:shadow-[6px_6px_0_var(--h-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--h-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--h-bg)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                  >
                    Shop {activeSlide.category}
                    <FiArrowRight
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      size={18}
                    />
                  </Link>

                  <Link
                    href="/products"
                    style={{ ...fg, backgroundColor: "var(--h-surface)" }}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 border border-[color:var(--h-border)] px-6 py-3 text-sm font-bold transition-all duration-200 hover:border-[#E0A000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB900]"
                  >
                    Shop All
                    <FiArrowDownRight
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                      size={17}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  variants={textItem}
                  style={muted}
                  className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <FiCheck className="text-emerald-600" size={15} />
                    Easy online shopping
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiCheck className="text-emerald-600" size={15} />
                    Secure checkout
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slider controls */}
            <div className="mt-8 flex w-full max-w-md items-center gap-3">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                style={{ ...btnFg, backgroundColor: "var(--h-surface)" }}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--h-border)] transition hover:border-[#FFB900] hover:bg-[#FFB900] hover:[--btn-fg:#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB900]"
              >
                <FiChevronLeft size={20} />
              </button>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span
                    style={fg}
                    className="truncate text-xs font-bold"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                    <span style={subtle} className="mx-1.5">
                      /
                    </span>
                    {String(slides.length).padStart(2, "0")}
                    <span style={muted} className="ml-2 font-semibold">
                      {activeSlide.category}
                    </span>
                  </span>
                  <span
                    style={subtle}
                    className="text-[10px] font-bold tracking-widest"
                  >
                    FEATURED
                  </span>
                </div>

                <div
                  className="h-1 overflow-hidden"
                  style={{ backgroundColor: "var(--h-track)" }}
                  role="progressbar"
                  aria-label="Slide progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                >
                  <div
                    className="h-full bg-[#FFB900]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                style={{ ...btnFg, backgroundColor: "var(--h-surface)" }}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--h-border)] transition hover:border-[#FFB900] hover:bg-[#FFB900] hover:[--btn-fg:#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB900]"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

            {/* Slide selectors */}
            <div className="mt-3 flex flex-wrap items-center">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Show ${slide.category}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="group flex h-6 items-center px-1 focus-visible:outline-none"
                >
                  <span
                    style={
                      activeIndex === index
                        ? undefined
                        : { backgroundColor: "var(--h-dot)" }
                    }
                    className={`block h-2 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#FFB900] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[color:var(--h-bg)] ${
                      activeIndex === index
                        ? "w-8 bg-[#FFB900]"
                        : "w-2 group-hover:opacity-60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product visual */}
          <div className="relative order-1 mx-auto w-full max-w-[440px] select-none [-webkit-touch-callout:none] lg:order-2 lg:max-w-[480px]">
            {/* Decorative circles */}
            <div
              aria-hidden="true"
              className="absolute -left-8 -top-8 hidden h-40 w-40 rounded-full border border-dashed border-[color:var(--h-border)] sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-6 hidden h-28 w-28 rounded-full border border-[color:var(--h-border)] sm:block"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide.id}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, x: -12 }}
                transition={visualTransition}
                className="relative pb-6 pr-3 pt-3"
              >
                {/* Ghost outline number */}
                <span
                  aria-hidden="true"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px var(--h-ghost)",
                  }}
                  className="pointer-events-none absolute -left-4 -top-12 hidden select-none text-[9rem] font-black leading-none sm:block"
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                {/* Offset brand square behind image */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-3 right-0 top-6 w-[92%] bg-[#FFB900]"
                />

                <div
                  style={{ backgroundColor: "var(--h-surface)" }}
                  className="group relative z-10 aspect-square w-[92%] overflow-hidden border border-[color:var(--h-border)] shadow-xl shadow-zinc-900/10"
                >
                  {failedImages.includes(activeSlide.id) ? (
                    <div
                      style={{ backgroundColor: "#F4F4F5", color: "#3F3F46" }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center"
                    >
                      <FiHeadphones size={42} />
                      <p className="text-sm font-semibold">{activeSlide.product}</p>
                      <p className="text-xs">Product image unavailable</p>
                    </div>
                  ) : (
                    <Image
                      src={activeSlide.image}
                      alt={activeSlide.product}
                      fill
                      draggable={false}
                      priority={activeIndex === 0}
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 480px"
                      className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => markImageFailed(activeSlide.id)}
                    />
                  )}

                  <div
                    style={{
                      backgroundColor: "var(--h-fg)",
                      color: "var(--h-bg)",
                    }}
                    className="absolute left-0 top-0 px-3 py-2 text-[9px] font-extrabold tracking-[0.15em] sm:text-[10px]"
                  >
                    {activeSlide.tag}
                  </div>
                </div>

                {/* Circle discount badge */}
                <div
                  style={{
                    backgroundColor: "#09090B",
                    boxShadow: "0 0 0 4px var(--h-bg)",
                  }}
                  className="absolute right-0 top-0 z-20 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full sm:h-20 sm:w-20"
                >
                  <span
                    style={{ color: "#FFB900" }}
                    className="text-lg font-black leading-none sm:text-xl"
                  >
                    {activeSlide.discount}
                  </span>
                  <span
                    style={{ color: "#FFFFFF" }}
                    className="mt-0.5 text-[9px] font-extrabold tracking-widest"
                  >
                    OFF
                  </span>
                </div>

                {/* Floating product card */}
                <div
                  style={{ backgroundColor: "var(--h-surface)" }}
                  className="absolute -bottom-1 left-0 z-20 w-[78%] max-w-[300px] border border-[color:var(--h-border)] p-4 shadow-xl shadow-zinc-900/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        style={subtle}
                        className="mb-1 text-[9px] font-extrabold tracking-[0.17em] sm:text-[10px]"
                      >
                        FEATURED PRODUCT
                      </p>
                      <h2
                        style={fg}
                        className="truncate text-sm font-bold"
                      >
                        {activeSlide.product}
                      </h2>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span
                          style={fg}
                          className="text-base font-black sm:text-lg"
                        >
                          {activeSlide.price}
                        </span>
                        <span
                          style={subtle}
                          className="text-xs font-medium line-through"
                        >
                          {activeSlide.oldPrice}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/products?category=${encodeURIComponent(activeSlide.category)}`}
                      aria-label={`Shop ${activeSlide.product}`}
                      style={{ color: "#18181B" }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FFB900] transition hover:bg-[#FFC62E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--h-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--h-surface)]"
                    >
                      <FiArrowRight size={19} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================
            ⬛ SQUARE SHAPE TRUST / BENEFIT CARDS
            ========================================= */}
        <div className="mt-14 grid grid-cols-1 gap-4 border-t border-[color:var(--h-border)] pt-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:pt-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="group relative flex items-center gap-4 border border-[color:var(--h-border)] bg-[color:var(--h-surface)] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB900] hover:shadow-lg hover:shadow-[#FFB900]/10"
              >
                {/* Clean Square Icon Container */}
                <span
                  style={{ color: "var(--ico-fg, var(--h-icon))" }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#FFB900]/20 transition-all duration-300 group-hover:bg-[#FFB900] group-hover:[--ico-fg:#18181B]"
                >
                  <Icon size={22} />
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    style={fg}
                    className="truncate text-sm font-extrabold sm:text-base"
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={muted}
                    className="mt-0.5 truncate text-xs leading-relaxed"
                  >
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom Highlight Border Line on Hover */}
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#FFB900] transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}