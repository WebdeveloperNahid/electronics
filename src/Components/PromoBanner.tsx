"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

// Edit these to match your real offer
const DEAL = {
  discount: "30%",
  headline: "Upgrade your setup, one gadget at a time.",
  text: "From everyday essentials to the latest flagships, everything you need is in one place.",
  image:
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1400&auto=format&fit=crop",
};

type TimeLeft = { h: number; m: number; s: number };

// Counts down to the end of the visitor's day, then restarts
function useCountdown(): TimeLeft | null {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const total = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      setLeft({
        h: Math.floor(total / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

const pad = (n: number) => String(n).padStart(2, "0");

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[72px] flex-col items-center border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <span className="text-3xl font-black tabular-nums text-white sm:text-4xl">
        {value}
      </span>
      <span className="mt-1 text-xs font-medium text-zinc-400">{label}</span>
    </div>
  );
}

export default function PromoBanner() {
  const reduceMotion = useReducedMotion();
  const left = useCountdown();

  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid overflow-hidden bg-zinc-900 text-white md:grid-cols-2 dark:border dark:border-zinc-800"
        >
          {/* Subtle diagonal texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
            }}
          />

          <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <span className="mb-5 block h-1 w-12 bg-[#FFB900]" />
            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {DEAL.headline}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
              {DEAL.text}
            </p>

            {/* Countdown */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-zinc-300">
                Today’s deals end in
              </p>
              <div className="flex gap-3" role="timer" aria-live="off">
                <TimeBox value={left ? pad(left.h) : "--"} label="Hours" />
                <TimeBox value={left ? pad(left.m) : "--"} label="Minutes" />
                <TimeBox value={left ? pad(left.s) : "--"} label="Seconds" />
              </div>
            </div>

            <div className="mt-9">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-[#FFB900] px-8 py-4 text-sm font-extrabold text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB900]"
              >
                Explore all products
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <div className="group relative min-h-72 md:min-h-[480px]">
            <Image
              src={DEAL.image}
              alt="Smart TV in a living room"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-zinc-900/60 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 h-2 bg-[#FFB900]" />

            {/* Rotating deal badge */}
            <div className="absolute right-5 top-5 h-28 w-28 sm:right-8 sm:top-8 sm:h-32 sm:w-32">
              <div className="absolute inset-0 rounded-full bg-[#FFB900] shadow-2xl" />
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              >
                <defs>
                  <path
                    id="promo-circle"
                    d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
                  />
                </defs>
                <text
                  className="fill-black text-[10px] font-extrabold"
                  textLength="280"
                  lengthAdjust="spacing"
                >
                  <textPath href="#promo-circle" textLength="280" lengthAdjust="spacing">
                    TODAY’S DEAL • TODAY’S DEAL • TODAY’S DEAL •
                  </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
                <span className="text-[10px] font-bold leading-none">Up to</span>
                <span className="text-2xl font-black leading-none sm:text-3xl">
                  {DEAL.discount}
                </span>
                <span className="text-[10px] font-bold leading-none">off</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}