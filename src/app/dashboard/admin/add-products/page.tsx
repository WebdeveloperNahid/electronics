"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Category } from "@/types";
import Image from "next/image";
import { FiImage, FiPackage, FiPlus, FiX, FiDollarSign, FiBox, FiTag } from "react-icons/fi";

const DEFAULT_CATEGORIES = [
  "Smartphones",
  "Laptops & Computers",
  "Audio & Headphones",
  "Cameras & Photography",
  "Smart Watches",
  "Gaming & Consoles",
  "TV & Home Entertainment",
  "Home Appliances",
  "Accessories & Chargers",
  "Networking & Wi-Fi Devices",
];

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    const ensureDefaultCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await apiFetch("/api/categories");
        const existing: Category[] = res.data || [];

        const existingNames = existing.map((c) => c.name.toLowerCase());
        const missing = DEFAULT_CATEGORIES.filter(
          (name) => !existingNames.includes(name.toLowerCase())
        );

        const created: Category[] = [];
        for (const name of missing) {
          try {
            const createRes = await apiFetch("/api/categories", {
              method: "POST",
              body: JSON.stringify({ name }),
            });
            created.push(createRes.data);
          } catch {
            // ignore individual failures
          }
        }

        setCategories([...existing, ...created]);
      } catch {
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    ensureDefaultCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiFetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
          categoryId: form.categoryId,
          image: form.image || undefined,
        }),
      });
      router.push("/products");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setCategoryError("");
    setAddingCategory(true);
    try {
      const res = await apiFetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const newCategory: Category = res.data;
      setCategories((prev) => [...prev, newCategory]);
      setForm((f) => ({ ...f, categoryId: newCategory.id }));
      setNewCategoryName("");
      setShowAddCategory(false);
    } catch (err: unknown) {
      setCategoryError(err instanceof Error ? err.message : "Failed to add category");
    } finally {
      setAddingCategory(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm shadow-orange-200 dark:shadow-none">
          <FiPackage className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
          <p className="text-sm text-gray-400 dark:text-zinc-500">Fill in the details to list a new item</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-6 border border-red-100 dark:border-red-500/20">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-8 grid grid-cols-1 md:grid-cols-3 gap-8 transition-colors"
      >
        {/* Left: Image Section */}
        <div className="md:col-span-1">
          <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            <FiImage size={14} className="text-orange-500" />
            Product Image
          </label>

          <div className="aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-800/50 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden relative group">
            {form.image ? (
              <>
                <Image
                  src={form.image}
                  alt="Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  onError={() => setForm((f) => ({ ...f, image: "" }))}
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, image: "" }))}
                  className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white dark:bg-zinc-900/90 dark:hover:bg-zinc-900 text-gray-600 dark:text-zinc-300 hover:text-red-500 rounded-full p-1.5 shadow-sm transition-colors"
                  aria-label="Remove image"
                >
                  <FiX size={14} />
                </button>
              </>
            ) : (
              <>
                <FiImage className="text-gray-300 dark:text-zinc-600" size={36} />
                <span className="text-xs text-gray-400 dark:text-zinc-500 mt-2 font-medium">No image yet</span>
                <span className="text-[11px] text-gray-300 dark:text-zinc-600 mt-0.5">Paste a URL below</span>
              </>
            )}
          </div>

          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1.5">
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-600"
            />
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-1.5">
              Paste any public image link — a preview will show up above.
            </p>
          </div>
        </div>

        {/* Right: Form Fields */}
        <div className="md:col-span-2 space-y-5">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-zinc-200 mb-1.5">
              <FiTag size={13} className="text-orange-500" />
              Product name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. iPhone 15 Pro"
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-zinc-200 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Short product description..."
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-zinc-200 mb-1.5">
                <FiDollarSign size={13} className="text-orange-500" />
                Price
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-600"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-zinc-200 mb-1.5">
                <FiBox size={13} className="text-orange-500" />
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                placeholder="0"
                className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Category + Quick Add */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                Category
              </label>
              <button
                type="button"
                onClick={() => setShowAddCategory((v) => !v)}
                className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {showAddCategory ? <FiX size={13} /> : <FiPlus size={13} />}
                {showAddCategory ? "Cancel" : "New Category"}
              </button>
            </div>

            {showAddCategory && (
              <div className="mb-3 flex gap-2 bg-orange-50/50 dark:bg-orange-500/10 p-2.5 rounded-lg border border-orange-100 dark:border-orange-500/20">
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Wearable Tech"
                  className="flex-1 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={addingCategory || !newCategoryName.trim()}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {addingCategory ? "Adding..." : "Add"}
                </button>
              </div>
            )}

            {categoryError && (
              <p className="text-xs text-red-500 dark:text-red-400 mb-2">{categoryError}</p>
            )}

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              disabled={categoriesLoading}
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 transition-all bg-white dark:bg-zinc-800 text-gray-900 dark:text-white disabled:opacity-50"
            >
              <option value="" className="dark:bg-zinc-800">
                {categoriesLoading ? "Loading categories..." : "Select a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="dark:bg-zinc-800">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm shadow-orange-200 dark:shadow-none disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}