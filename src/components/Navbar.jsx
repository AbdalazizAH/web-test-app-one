"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/api";

export default function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCartCount() {
      try {
        setIsLoading(true);
        const cart = await getCart();
        if (cart && typeof cart.TotalItems === "number") {
          setCartItemCount(cart.TotalItems);
        }
      } catch (err) {
        console.error("فشل في تحميل عدد منتجات العربة:", err);
        // في حالة الخطأ نضع القيمة صفر
        setCartItemCount(0);
      } finally {
        setIsLoading(false);
      }
    }

    loadCartCount();

    // تنظيف عند إزالة المكون
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">
            المتجر
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/products" className="hover:text-blue-600">
              المنتجات
            </Link>
            <Link href="/cart" className="relative hover:text-blue-600">
              عربة التسوق
              {!isLoading && cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
