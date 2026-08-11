"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  imageUrl?: string;
  category?: {
    name: string;
  };
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://electronics-backend-ten.vercel.app";
        const response = await fetch(`${apiUrl}/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product details");
        }

        setProduct(data.data || data);
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

    fetchProductDetails();
  }, [id]);

  const handleOrder = async () => {
    setOrdering(true);
    setError("");
    setSuccessMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://electronics-backend-ten.vercel.app";
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity: Number(quantity),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order. Please login first.");
      }

      setSuccessMessage("Order placed successfully!");
      setTimeout(() => {
        router.push("/orders");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to place order");
      }
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-zinc-400">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <button
          onClick={() => router.push("/products")}
          className="bg-orange-500 text-white px-4 py-2 font-medium"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const productImage = product.image || product.imageUrl;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-orange-500 mb-6 transition-colors"
      >
        <FiArrowLeft size={18} /> Back
      </button>

      {successMessage && <div className="mb-4 p-4 bg-green-100 text-green-600">{successMessage}</div>}
      {error && <div className="mb-4 p-4 bg-red-100 text-red-600">{error}</div>}

      {/* মূল কন্টেইনার থেকে রাউন্ড সরিয়ে দেওয়া হয়েছে */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 shadow-sm">
        
        {/* প্রোডাক্ট ইমেজ সেকশন এবং ইমেজ থেকে রাউন্ড বাদ দেওয়া হয়েছে */}
        <div className="bg-gray-100 dark:bg-zinc-800 h-80 relative flex items-center justify-center overflow-hidden">
          {productImage ? (
            <img
              src={productImage}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 dark:text-zinc-500 font-semibold">
              No Image Available
            </span>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider text-orange-500 uppercase">
              {product.category?.name || "Electronics"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-3">
              {product.name}
            </h1>
            <p className="text-2xl font-black text-orange-500 mb-4">
              ${product.price}
            </p>
            <p className="text-gray-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
              Stock Available: <span className="font-semibold text-gray-800 dark:text-zinc-200">{product.stock} units</span>
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 px-3 py-1.5 border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white text-center"
              />
            </div>

            {/* বাটন থেকে রাউন্ড পুরোপুরি বাদ দেওয়া হয়েছে */}
            <button
              onClick={handleOrder}
              disabled={ordering || product.stock <= 0}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 transition-colors shadow-sm"
            >
              <FiShoppingCart size={18} />
              {ordering ? "Processing..." : product.stock > 0 ? "Place Order Now" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}