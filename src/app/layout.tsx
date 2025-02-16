import { Armata } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const armata = Armata({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata = {
  title: "Awaaz - Empower Change",
  description: "Bring the Change with Your Voice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${armata.className} antialiased`}>
        <Navbar />
        <main className="mx-auto lg:py-4">
          {children}
        </main>
        <Footer />
        <PrelineScript />
      </body>
    </html>
  );
}
