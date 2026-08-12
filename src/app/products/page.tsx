"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/Components/ProductCard";
import { Product } from "@/types";
import { FiSearch, FiX, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PRODUCTS_PER_PAGE = 12;

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://electronics-backend-ten.vercel.app";
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.data || data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const names = products
      .map((p) => p.category?.name)
      .filter((name): name is string => Boolean(name));
    return Array.from(new Set(names)).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category?.name?.toLowerCase().includes(term);

      const matchesCategory =
        !selectedCategory || product.category?.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Search/Category বদলালে সবসময় page 1 এ ফিরে যাও
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const hasActiveFilters = searchTerm || selectedCategory;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 1, 2, 3 ... এভাবে পেজ নাম্বার বানানো (বেশি পেজ হলে ... দেখাবে)
  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-400 dark:text-zinc-500">
        Loading all products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">All Products</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Explore our latest collection of electronic items.
        </p>
      </div>

      {/* Search + Category Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-md">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-orange-500 transition-colors"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        <div className="relative sm:w-56">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors cursor-pointer"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 pointer-events-none"
            size={16}
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            <FiX size={16} />
            Clear filters
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
          {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      )}

      {paginatedProducts.length === 0 ? (
        <p className="text-gray-400 dark:text-zinc-500 text-center py-10">
          {hasActiveFilters ? "No products match your filters." : "No products available at the moment."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-zinc-700 transition-colors"
              >
                <FiChevronLeft size={16} />
              </button>

              {pageNumbers.map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="px-2 text-gray-400 dark:text-zinc-600 text-sm"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 dark:text-zinc-400 hover:bg-orange-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-zinc-700 transition-colors"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}