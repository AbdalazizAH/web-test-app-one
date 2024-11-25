import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        تم إتمام الطلب بنجاح!
      </h1>
      <p className="text-gray-600 mb-8">
        شكراً لك على طلبك. سنقوم بالتواصل معك قريباً لتأكيد الطلب.
      </p>
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
      >
        العودة للتسوق
      </Link>
    </div>
  );
}
