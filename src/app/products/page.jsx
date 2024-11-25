"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts, addToCart } from "@/utils/api";
import Loading from "@/components/Loading";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId);
      // You might want to show a success message here
    } catch (err) {
      console.error("Failed to add to cart:", err);
      // Show error message to user
    }
  }

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={product.ProductID}
            className="border rounded-lg p-4 shadow-sm"
          >
            {product.images?.[0] && (
              <div className="relative h-48 mb-4">
                <Image
                  src={product.images[0].ImageURL}
                  alt={product.images[0].AltText || product.ProductName}
                  fill
                  priority={index === 0}
                  className="object-cover rounded-md w-auto h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">
              {product.ProductName}
            </h2>
            <p className="text-gray-600 mb-2">{product.Description}</p>
            <p className="text-lg font-bold mb-4">${product.SellPrice}</p>
            <button
              onClick={() => handleAddToCart(product.ProductID)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
