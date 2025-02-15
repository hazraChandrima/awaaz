"use client";

import { Abhaya_Libre } from "next/font/google";
import Link from "next/link";
import Carousel from "./components/Carousel";
import RotatingText from "./components/effects/RotateText";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

const abhaya = Abhaya_Libre({ subsets: ["latin"], weight: "800" });

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="bg-[#E8EBE4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="flex flex-wrap items-center font-semibold text-[#223843] text-4xl sm:text-5xl md:text-6xl text-center sm:text-left">
            <span className={`${abhaya.className} text-[#CA3C25] text-6xl sm:text-7xl md:text-8xl leading-tight`}>Awaaz:</span>
            <span className="mt-2 sm:mt-0 sm:ml-3">
              <RotatingText
                texts={["Online Petition", "Raise Your Voice", "Shape the Change"]}
                mainClassName="font-bold px-2 sm:px-3 md:px-4 text-black overflow-hidden py-1 sm:py-1.5 md:pt-3 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 sm:pb-1.5 md:pb-2"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </span>
          </h1>
          <div className="max-w-4xl mx-auto sm:mx-0 text-center sm:text-left">
            <p className="mt-4 sm:mt-5 text-[#223843] text-base sm:text-lg md:text-xl">
              Your voice has the power to spark change. Awaaz empowers individuals and communities to take action on issues that matter.
              With our intuitive Petition Maker, you can mobilize support, raise awareness, and influence decision-makers.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 sm:mt-6 justify-center sm:justify-start">
              <Link href={'/sign-up'} className="py-3 px-6 inline-flex items-center font-semibold text-sm sm:text-base rounded-md border border-[#CA3C25] text-[#CA3C25] bg-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                Get Started
              </Link>
              <Link
                href={currentUser ? "/create" : "/sign-in"}
                className="mt-3 sm:mt-0 py-3 px-6 inline-flex items-center font-semibold text-sm sm:text-base rounded-md bg-[#CA3C25] text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Create Petition
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-10 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <Carousel />
      </div>
    </div>
  );
}


