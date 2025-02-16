"use client";

import { Abhaya_Libre } from "next/font/google";
import { motion } from "framer-motion";

const abhaya = Abhaya_Libre({ subsets: ["latin"], weight: "800" });

export default function Vision() {
  return (
    <div id="vision" className="bg-[#E8EBE4] py-20 sm:py-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`${abhaya.className} text-[#CA3C25] text-5xl sm:text-6xl font-extrabold`}
        >
          Our Mission
        </h2>
        <motion.div
          className="w-16 sm:w-20 h-1 bg-[#CA3C25] mx-auto mt-2 rounded-lg"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <p className="mt-6 text-lg sm:text-xl text-[#223843] leading-relaxed">
          Your voice has the power to spark change. Awaaz empowers individuals
          and communities to take action on issues that matter. With our
          intuitive Petition Maker, you can mobilize support, raise awareness,
          and influence decision-makers.
        </p>

        {/* Mission Statement */}
        <p className="mt-6 text-lg sm:text-xl text-[#223843] leading-relaxed">
          We believe in the power of voices coming together to make a change.
          <span className="text-[#CA3C25] font-semibold"> Awaaz</span> is built
          to empower individuals, communities, and organizations to take
          meaningful action on issues that matter.
        </p>

        {/* Animated Call to Action */}
        <motion.div
          className="mt-6 inline-block group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/sign-up"
            className="py-3 px-6 inline-flex items-center font-semibold text-lg rounded-md border border-[#CA3C25] text-[#CA3C25] transition-all duration-300 ease-in-out hover:bg-[#CA3C25] hover:text-white"
          >
            Join the Movement
          </a>
        </motion.div>
      </div>
    </div>
  );
}
