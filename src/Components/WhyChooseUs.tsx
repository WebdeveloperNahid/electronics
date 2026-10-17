"use client";

import { motion } from "motion/react";
import { FiTruck, FiShield, FiHeadphones, FiCheckCircle } from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description: "Get your order delivered to your doorstep quickly and reliably.",
  },
  {
    icon: FiShield,
    title: "Secure Payment",
    description: "Your transactions are protected with industry-standard security.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Our team is here to help you anytime, day or night.",
  },
  {
    icon: FiCheckCircle,
    title: "Genuine Products",
    description: "Every item is 100% authentic, sourced directly from trusted brands.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-gray-100 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Why Choose <span className="text-orange-500">ElectroShop</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
            We make online shopping for electronics simple, safe, and fast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 sm:p-7 overflow-hidden transition-colors duration-300 hover:border-orange-500 dark:hover:border-orange-500"
            >
              {/* Top accent bar — hover এ animate হয়ে বাম থেকে ডানে ভরে যায় */}
              <span className="absolute top-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-500 ease-out group-hover:w-full" />

              {/* Corner accent — subtle geometric detail, square theme-এর সাথে যায় */}
              <span className="absolute -right-6 -top-6 w-16 h-16 bg-orange-50 dark:bg-orange-500/5 rotate-45 transition-transform duration-500 group-hover:scale-125" />

              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="w-12 h-12 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-700 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:-rotate-6">
                  <feature.icon
                    className="text-orange-500 group-hover:text-white transition-colors duration-300"
                    size={20}
                  />
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}