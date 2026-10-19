"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiHeadphones,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Fast delivery",
    description: "Your order reaches your doorstep quickly and reliably.",
  },
  {
    icon: FiShield,
    title: "Secure payment",
    description: "Every transaction is protected with industry-standard security.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 support",
    description: "Our team is here to help you anytime, day or night.",
  },
  {
    icon: FiCheckCircle,
    title: "Genuine products",
    description: "Every item is 100% authentic, sourced from trusted brands.",
  },
];

// Placeholder numbers: replace with your real figures
const stats = [
  { value: 50000, suffix: "+", label: "Happy customers", decimals: 0 },
  { value: 2000, suffix: "+", label: "Products in store", decimals: 0 },
  { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
  { value: 24, suffix: "/7", label: "Customer support", decimals: 0 },
];

function Counter({
  to,
  suffix,
  decimals,
}: {
  to: number;
  suffix: string;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduceMotion]);

  const text =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");

  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden border-t border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* Left: heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-5 block h-1.5 w-14 bg-[#FFB900]" />
          <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Why shoppers choose ElectroShop
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            We make online shopping for electronics simple, safe, and fast.
          </p>
          <Link
            href="/products"
            className="group mt-8 inline-flex items-center gap-2 bg-zinc-950 px-8 py-4 text-sm font-extrabold text-white transition-colors hover:bg-[#FFB900] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB900] dark:bg-[#FFB900] dark:text-black dark:hover:bg-white"
          >
            Start shopping
            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Right: feature cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: (i % 2) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={i % 2 === 1 ? "sm:mt-10" : ""}
            >
              <div className="group h-full border-2 border-zinc-950 bg-white p-7 shadow-[6px_6px_0_0_#18181b] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#FFB900] dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-[6px_6px_0_0_#FFB900] dark:hover:border-[#FFB900] dark:hover:shadow-[10px_10px_0_0_#FFB900]">
                <div className="mb-7 flex h-14 w-14 items-center justify-center bg-[#FFB900] text-black transition-transform duration-300 group-hover:-rotate-6">
                  <feature.icon size={26} />
                </div>
                <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats band: yellow in light mode, dark in dark mode */}
      <div className="bg-[#FFB900] dark:border-t dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-4 text-center ${
                i > 0 ? "lg:border-l lg:border-black/20 lg:dark:border-white/10" : ""
              }`}
            >
              <p className="text-4xl font-black text-black sm:text-5xl dark:text-[#FFB900]">
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="mt-2 text-sm font-bold text-black/80 dark:font-medium dark:text-zinc-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}