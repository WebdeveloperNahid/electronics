"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 text-xs transition-colors">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider text-gray-900 dark:text-white uppercase">
              ElectroShop
            </span>
          </div>
          <p className="text-gray-500 dark:text-zinc-400 leading-relaxed">
            Your ultimate destination for high-end electronics, latest smartphones, smart gadgets, and cutting-edge home appliances. Quality and innovation delivered to your doorstep.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="w-8 h-8 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-colors">
              <FaFacebookF size={12} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-colors">
              <FaTwitter size={12} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-colors">
              <FaLinkedinIn size={12} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-colors">
              <FaInstagram size={12} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links / Categories */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold uppercase tracking-wider mb-4 text-sm">
            Categories
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Smartphones & Tablets
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Laptops & Computers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Smart Gadgets
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Home Appliances
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Audio & Headphones
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold uppercase tracking-wider mb-4 text-sm">
            My Account
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/profile" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Order History
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                My Wishlist
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Sign In / Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold uppercase tracking-wider mb-4 text-sm">
            Get In Touch
          </h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={2}
              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2.5 uppercase tracking-wider hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Submit Message</span>
              <FiSend size={13} />
            </button>
          </form>
        </div>

      </div>
d
      {/* Bottom Sub-footer (Copyright & Payments) */}
      <div className="border-t border-gray-100 dark:border-zinc-800/80 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 dark:text-zinc-500">
          <p>© 2026 ElectroShop. All Rights Reserved.</p>
          <div className="flex items-center gap-2 opacity-70">
            <span className="border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-50 dark:bg-zinc-800">VISA</span>
            <span className="border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-50 dark:bg-zinc-800">MasterCard</span>
            <span className="border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-50 dark:bg-zinc-800">PayPal</span>
            <span className="border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-50 dark:bg-zinc-800">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}