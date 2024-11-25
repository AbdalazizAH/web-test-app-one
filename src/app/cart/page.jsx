"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCart, clearCart } from "@/utils/api";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError("فشل في تحميل عربة التسوق");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleClearCart() {
    try {
      await clearCart();
      await loadCart();
    } catch (err) {
      console.error("فشل في تفريغ عربة التسوق:", err);
    }
  }

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">خطأ: {error}</div>;
  if (!cart?.Items?.length) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">عربة التسوق فارغة</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          العودة للتسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">عربة التسوق</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cart.Items.map((item) => (
          <div
            key={item.CartItemId}
            className="flex items-center border-b py-4"
          >
            <div className="relative h-24 w-24 flex-shrink-0">
              <Image
                src={item.ImageUrl}
                alt={item.ProductName}
                fill
                className="object-cover rounded-md w-auto h-auto"
                sizes="96px"
              />
            </div>
            <div className="mr-4 flex-grow">
              <h3 className="font-semibold">{item.ProductName}</h3>
              <p className="text-gray-600">السعر: ${item.Price}</p>
              <p className="text-gray-600">الكمية: {item.Quantity}</p>
              <p className="text-gray-600">المجموع: ${item.Total}</p>
            </div>
          </div>
        ))}

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>المجموع الكلي:</span>
            <span>${cart.TotalAmount}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>عدد المنتجات:</span>
            <span>{cart.TotalItems}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleClearCart}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            تفريغ العربة
          </button>
          <Link
            href="/checkout"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            إتمام الشراء
          </Link>
        </div>
      </div>
    </div>
  );
}
