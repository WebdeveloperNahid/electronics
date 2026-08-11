"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import { Product, Category } from "@/types";
import {
  FiEdit2,
  FiTrash2,
  FiX,
  FiAlertTriangle,
  FiImage,
} from "react-icons/fi";

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        apiFetch("/api/products"),
        apiFetch("/api/categories"),
      ]);
      setProducts(productsRes?.data || []);
      setCategories(categoriesRes?.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      categoryId: product.categoryId,
      image: product.image || "",
    });
    setEditError("");
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setEditError("");
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setEditError("");
    setSaving(true);
    try {
      const res = await apiFetch(`/api/products/${editingProduct.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          price: parseFloat(editForm.price),
          stock: parseInt(editForm.stock),
          categoryId: editForm.categoryId,
          image: editForm.image || undefined,
        }),
      });
      const updated: Product = res.data;
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      closeEditModal();
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/products/${deletingProduct.id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      setDeletingProduct(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Products</h1>
        <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">
          {loading ? "Loading..." : `${products.length} products listed`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-sm px-4 py-3 mb-6 border border-red-100 dark:border-red-500/30">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-zinc-800 h-32 animate-pulse bg-gray-50 dark:bg-zinc-900" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <p className="text-gray-400 dark:text-zinc-500">No products yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row hover:border-gray-300 dark:hover:border-zinc-700 transition-colors"
            >
              {/* Left: Image */}
              <div className="w-full sm:w-40 h-40 flex-shrink-0 bg-[#f8f8f8] dark:bg-zinc-800 relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <FiImage className="text-gray-300 dark:text-zinc-600" size={28} />
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    {product.category?.name || "Uncategorized"}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-zinc-400 mt-1.5 line-clamp-2 max-w-xl">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        product.stock > 0 ? "text-gray-500 dark:text-zinc-400" : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-3 py-1.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-zinc-900 dark:hover:border-white transition-colors cursor-pointer"
                    >
                      <FiEdit2 size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingProduct(product)}
                      className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 dark:border-red-500/30 px-3 py-1.5 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors cursor-pointer"
                    >
                      <FiTrash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- Edit Modal ---- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={closeEditModal} />

          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Edit Product
              </h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              {editError && (
                <div className="bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-xs px-3 py-2 border border-red-100 dark:border-red-500/30">
                  {editError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Product name
                </label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-zinc-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                  rows={3}
                  className="w-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-zinc-400 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-zinc-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editForm.stock}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-zinc-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={editForm.categoryId}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-zinc-400 transition-colors"
                >
                  <option value="" className="dark:bg-zinc-800">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="dark:bg-zinc-800">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Image URL
                </label>
                <input
                  name="image"
                  value={editForm.image}
                  onChange={handleEditChange}
                  placeholder="https://example.com/product.jpg"
                  className="w-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-xs focus:outline-none focus:border-gray-900 dark:focus:border-zinc-400 transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-zinc-900 py-2.5 text-sm font-semibold hover:bg-black dark:hover:bg-zinc-100 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---- Delete Confirm Modal ---- */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !deleting && setDeletingProduct(null)}
          />
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-sm p-6 border border-gray-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <FiAlertTriangle className="text-red-500" size={20} />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Delete Product
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-800 dark:text-zinc-200">
                &quot;{deletingProduct.name}&quot;
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingProduct(null)}
                disabled={deleting}
                className="flex-1 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 text-white py-2.5 text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}