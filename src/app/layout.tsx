import type { Metadata } from "next";
import { Armata } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import "./globals.css";
import Footer from "./components/footer/Footer";

import Navbar from "./components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Awaaz",
  description: "Raise your voice, Shape the change.",
};

const armata = Armata({ subsets: ["latin"], weight: "400", display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${armata.className} antialiased`}>
          <Navbar />
           <main className="max-w-[85rem] mx-auto lg:py-4 ">{children}</main>
          <Footer />
        </body>
        <PrelineScript />
      </html>
    </ClerkProvider>
  );
}
