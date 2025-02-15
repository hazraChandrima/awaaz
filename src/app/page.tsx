"use client";

import { Abhaya_Libre } from "next/font/google";
import Link from "next/link";
import Carousel from "./components/Carousel";

const abhaya = Abhaya_Libre({ subsets: ["latin"], weight: "800" });

export default function Home() {
  return (
    <div className="bg-[#E8EBE4] min-h-screen relative flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/world-map.png')" }}
      ></div>

      <div className="relative text-center max-w-5xl mx-auto px-4 xl:px-0">
        <h1 className={`${abhaya.className} text-[#CA3C25] text-[7rem] mb-0`}>
          Awaaz
        </h1>
        <h2 className="text-[#223843] text-2xl font-semibold mt-0">
          Raise your voice, Shape the change.
        </h2>

        <div className="max-w-4xl mx-auto mt-6">
          <p className="text-[#223843] text-lg">
            Your voice has the power to spark change. Awaaz empowers individuals
            and communities to take action on issues that matter. With our
            intuitive Petition Maker, you can mobilize support,
            and influence decision-makers. Whether it’s social justice, climate
            action, turn your passion into impact and be the
            catalyst for transformation.
          </p>
          <p className="text-[#223843] text-lg">
            We believe in the strength of collective action and aim to provide a platform where individuals can speak up, raise awareness, and influence decisions that shape society. By making advocacy accessible and impactful, we empower communities to stand for justice, equality, and progress. Awaaz is more than just a petition platform—it is a movement towards a future built on inclusivity, accountability, and the unwavering belief that every voice matters.
          </p>

          <div className="flex space-x-4 justify-center mt-6">
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

      {/* Carousel Section */}
      <div className="w-full mt-12 px-6">
        <Carousel />
      </div>
    </div>
  );
}
