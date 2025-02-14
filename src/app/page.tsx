"use client";

import { Abhaya_Libre } from "next/font/google";
import Vision from "./(public)/home/page";
import Link from "next/link";

const abhaya = Abhaya_Libre({ subsets: ["latin"], weight: "800" });

export default function Home() {
  return (
    <>
      <div className="bg-[#E8EBE4] relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/world-map.png')" }}
        ></div>
        <div className="relative max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
          <h1 className="font-semibold text-[#223843] text-5xl md:text-6xl">
            <span className={`${abhaya.className} text-[#CA3C25] text-[8rem]`}>
              Awaaz:
            </span>{" "}
            Online Petition
          </h1>
          <div className="max-w-4xl">
            <p className="mt-5 text-[#223843] text-lg">
              Your voice has the power to spark change. Awaaz empowers
              individuals and communities to take action on issues that matter.
              With our intuitive Petition Maker, you can mobilize support, raise
              awareness, and influence decision-makers. Whether it’s social
              justice, climate action, or policy reform, turn your passion into
              impact and be the catalyst for transformation.
            </p>
            <div className="flex space-x-4 mt-2">
              <button className="py-3 px-4 inline-flex items-center font-semibold text-sm rounded-md border border-[#CA3C25] text-[#CA3C25] bg-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                Get Started
              </button>
              <Link
                href={"/create"}
                className="py-3 px-4 inline-flex items-center font-semibold text-sm rounded-md bg-[#CA3C25] text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Create Petition
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Vision />
    </>
  );
}
