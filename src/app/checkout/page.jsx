"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkoutCart } from "@/utils/api";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    CustomerName: "",
    CustomerPhone: "",
    Email: "",
    Address: "",
    City: "",
    Notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await checkoutCart(formData);
      router.push("/checkout/success");
    } catch (err) {
      setError("فشل في إتمام عملية الشراء. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">إتمام الشراء</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="space-y-4">
          <div>
            <label htmlFor="CustomerName" className="block mb-1">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="CustomerName"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="CustomerPhone" className="block mb-1">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="CustomerPhone"
              name="CustomerPhone"
              value={formData.CustomerPhone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="Email" className="block mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="Address" className="block mb-1">
              العنوان
            </label>
            <textarea
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>

          <div>
            <label htmlFor="City" className="block mb-1">
              المدينة
            </label>
            <input
              type="text"
              id="City"
              name="City"
              value={formData.City}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="Notes" className="block mb-1">
              ملاحظات إضافية
            </label>
            <textarea
              id="Notes"
              name="Notes"
              value={formData.Notes}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>
        </div>

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? "جاري المعالجة..." : "إتمام الطلب"}
        </button>
      </form>
    </div>
  );
}
