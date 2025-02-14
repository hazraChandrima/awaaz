import type { Metadata } from "next";
import { Armata } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PrelineScript from "./components/PrelineScript";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awaaz",
  description: "Raise your voice, Shape the change.",
};

const armata = Armata({ subsets: ["latin"], weight: "400", display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${armata.className} antialiased`}>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </body>
        <PrelineScript />
      </html>
    </ClerkProvider>
  );
}
