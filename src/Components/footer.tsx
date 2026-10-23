"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FiArrowUp, FiChevronRight, FiSend } from "react-icons/fi";

const categories = [
  { label: "Smartphones", href: "/products?category=Smartphones" },
  { label: "Laptops", href: "/products?category=Laptops" },
  { label: "Smart Watches", href: "/products?category=Smart%20Watches" },
  { label: "Audio & Headphones", href: "/products?category=Audio" },
  { label: "Gaming", href: "/products?category=Gaming" },
  { label: "TV & Displays", href: "/products?category=TV%20%26%20Displays" },
];

const accountLinks = [
  { label: "My Profile", href: "/profile" },
  { label: "Order History", href: "#" },
  { label: "My Wishlist", href: "#" },
  { label: "Sign In / Register", href: "/login" },
];

const socials = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Twitter", icon: FaTwitter, href: "#" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
];

const payments = ["VISA", "MasterCard", "PayPal", "Stripe"];

/**
 * Theme variables: background and text always come from the same set,
 * so they flip together and can never end up unreadable.
 */
const THEME_VARS = [
  "[--f-bg:#FFFFFF]",
  "[--f-surface:#F4F4F5]",
  "[--f-fg:#09090B]",
  "[--f-muted:#3F3F46]",
  "[--f-subtle:#52525B]",
  "[--f-border:#D4D4D8]",
  "[--f-input:#FFFFFF]",
  "dark:[--f-bg:#09090B]",
  "dark:[--f-surface:#18181B]",
  "dark:[--f-fg:#FFFFFF]",
  "dark:[--f-muted:#D4D4D8]",
  "dark:[--f-subtle:#A1A1AA]",
  "dark:[--f-border:rgba(255,255,255,0.14)]",
  "dark:[--f-input:#111113]",
].join(" ");

const fg: CSSProperties = { color: "var(--f-fg)" };
const muted: CSSProperties = { color: "var(--f-muted)" };
const subtle: CSSProperties = { color: "var(--f-subtle)" };

const inputClass =
  "w-full border border-[color:var(--f-border)] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-[color:var(--f-subtle)] focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]";

const inputStyle: CSSProperties = {
  backgroundColor: "var(--f-input)",
  color: "var(--f-fg)",
};

function FooterHeading({ children }: { children: string }) {
  return (
    <h3
      style={fg}
      className="mb-5 flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-[0.14em]"
    >
      <span aria-hidden="true" className="h-3 w-1 bg-[#FFB900]" />
      {children}
    </h3>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{ color: "var(--lk, var(--f-muted))" }}
      className="group inline-flex items-center gap-1.5 text-sm transition-colors hover:[--lk:var(--f-fg)]"
    >
      <FiChevronRight
        aria-hidden="true"
        size={13}
        className="-ml-3.5 text-[#FFB900] opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-100"
      />
      <span>{label}</span>
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--f-bg)",
        color: "var(--f-muted)",
        borderTop: "1px solid var(--f-border)",
      }}
      className={THEME_VARS}
    >
      {/* Top brand strip */}
      <div className="bg-[#FFB900]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p
            style={{ color: "#18181B" }}
            className="text-base font-extrabold tracking-tight sm:text-lg"
          >
            Upgrade your tech. Shop smarter with ElectroShop.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              style={{ color: "#FFFFFF", backgroundColor: "#18181B" }}
              className="inline-flex min-h-10 items-center gap-2 px-5 py-2 text-sm font-bold transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFB900]"
            >
              Browse Products
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              style={{ color: "#18181B" }}
              className="flex h-10 w-10 items-center justify-center border-2 border-[#18181B] transition-colors hover:bg-[#18181B] hover:text-[#FFB900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFB900]"
            >
              <FiArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-4 lg:pr-6">
            <Link
              href="/"
              aria-label="ElectroShop home"
              style={fg}
              className="inline-flex items-center text-2xl font-black uppercase tracking-wide"
            >
              Electro
              <span
                style={{ color: "#18181B" }}
                className="ml-1 bg-[#FFB900] px-1.5"
              >
                Shop
              </span>
            </Link>

            <p style={muted} className="max-w-sm text-sm leading-7">
              Your destination for quality electronics, smartphones, smart
              gadgets and home appliances, delivered right to your doorstep.
            </p>

            <div className="flex items-center gap-2">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    color: "var(--s-fg, var(--f-fg))",
                    backgroundColor: "var(--f-surface)",
                  }}
                  className="flex h-10 w-10 items-center justify-center border border-[color:var(--f-border)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFB900] hover:bg-[#FFB900] hover:[--s-fg:#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB900]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <FooterHeading>Categories</FooterHeading>
            <ul className="space-y-3">
              {categories.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div className="lg:col-span-2">
            <FooterHeading>My Account</FooterHeading>
            <ul className="space-y-3">
              {accountLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact form */}
          <div className="sm:col-span-2 lg:col-span-4">
            <FooterHeading>Get In Touch</FooterHeading>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="footer-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="footer-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your Name"
                    style={inputStyle}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="footer-email" className="sr-only">
                    Your email
                  </label>
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Your Email"
                    style={inputStyle}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="footer-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="footer-message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Your Message"
                  style={inputStyle}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                style={{ color: "#18181B" }}
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#FFB900] px-5 py-2.5 text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_var(--f-fg)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FFC62E] hover:shadow-[6px_6px_0_var(--f-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--f-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--f-bg)] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                Submit Message
                <FiSend
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          backgroundColor: "var(--f-surface)",
          borderTop: "1px solid var(--f-border)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p style={subtle} className="text-xs font-medium">
            © {year} ElectroShop. All Rights Reserved.
          </p>

          <ul
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Accepted payment methods"
          >
            {payments.map((payment) => (
              <li
                key={payment}
                style={{ ...fg, backgroundColor: "var(--f-bg)" }}
                className="border border-[color:var(--f-border)] px-2.5 py-1 text-[10px] font-bold tracking-wide"
              >
                {payment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}