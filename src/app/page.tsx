"use client";

import { Abhaya_Libre } from "next/font/google";
import Vision from "./(public)/home/page";
import Link from "next/link";
import RotatingText from "./components/effects/RotateText";

const abhaya = Abhaya_Libre({ subsets: ["latin"], weight: "800" });

export default function Home() {
  return (
    <>
      <div className="bg-[#E8EBE4]">
        <div className="max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
          <h1 className="flex items-center font-semibold text-[#223843] text-5xl md:text-6xl">
            <span className={`${abhaya.className} text-[#CA3C25] text-[8rem]`}>
              Awaaz:
            </span>{" "}
            <span>
            <RotatingText
            texts={["Online Petition", "Raise Your Voice", "Shape the Change",]}
            mainClassName="font-bold px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:pt-3 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
            </span>
          </h1>
          <div className="max-w-4xl">
            <p className="mt-5 text-[#223843] text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              distinctio illum nulla aperiam laborum reiciendis pariatur
              doloremque optio commodi deleniti ex saepe, provident, ea
              molestias? Quisquam voluptates quae vel neque quod fugiat error
              repellat, repellendus asperiores consequuntur molestias eum
              corrupti, nobis vero quos? Nisi mollitia natus tempora quam
              suscipit libero quae doloribus.
            </p>
            <div className="flex space-x-4 mt-2">
              <button className="py-3 px-4 inline-flex items-center font-semibold text-sm rounded-md border border-[#CA3C25] text-[#CA3C25] bg-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
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
