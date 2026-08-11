"use client";

import { DashboardSidebar } from "@/Components/dashboard/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Login করা না থাকলে সরাসরি login এ পাঠাও
    if (!user) {
      router.push("/login");
      return;
    }

    // "/dashboard" এ সরাসরি এলে role অনুযায়ী নিজস্ব home এ পাঠায় দাও
    if (pathname === "/dashboard") {
      router.push(user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user");
      return;
    }

    // Customer, Admin এর route এ ঢুকতে চাইলে ব্লক করো
    if (user.role !== "ADMIN" && pathname.startsWith("/dashboard/admin")) {
      router.push("/dashboard/user");
      return;
    }

    // Admin কে customer-only route এ যাওয়ার দরকার নাই, চাইলে allow ও রাখা যায়
    if (user.role === "ADMIN" && pathname.startsWith("/dashboard/user")) {
      router.push("/dashboard/admin");
      return;
    }
  }, [user, loading, pathname, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;