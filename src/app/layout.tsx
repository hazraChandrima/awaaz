import { Armata } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

export const metadata = {
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
    <html lang="en">
      <body className={`${armata.className} antialiased`}>
        <Navbar />
        <div className="text-center text-3xl font-bold mt-4">
        </div>
        <main className="max-w-[85rem] mx-auto lg:py-4">{children}</main>
        <Footer />
        <PrelineScript />
      </body>
    </html>
  );
}
