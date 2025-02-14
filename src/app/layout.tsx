import type { Metadata } from "next";
import {Armata } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awaaz",
  description: "Raise your voice, Shape the change.",
};

const armata = Armata({subsets:['latin'], weight: '400', display: 'swap'});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${armata.className} antialiased`}
      >
        {children}
      </body>
      <PrelineScript/>
    </html>
  );
}
