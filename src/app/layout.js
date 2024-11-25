import { Roboto, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: "المتجر الإلكتروني",
  description: "متجر إلكتروني بسيط",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
