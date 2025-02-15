"use client";

import { Armata } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Loader from "./components/Loader";
import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const armata = Armata({ subsets: ["latin"], weight: "400", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Tracks route changes

  useEffect(() => {
    setLoading(true); // Start loading
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout); // Cleanup function
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${armata.className} antialiased`}>
        <Navbar />
        <div className="text-center text-3xl font-bold mt-4"></div>
        <main className="max-w-[85rem] mx-auto lg:py-4">
          {loading && <Loader />}
          {children}
        </main>
        <Footer />
        <PrelineScript />
      </body>
    </html>
  );
}
