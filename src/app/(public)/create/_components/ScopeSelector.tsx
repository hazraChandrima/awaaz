"use client";

import { FaHome, FaLandmark, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  scope: string;
  setScope: (value: string) => void;
}

const ScopeSelector: React.FC<Props> = ({ scope, setScope }) => {
  const scopes = [
    { label: "Local", icon: <FaHome />, value: "Local" },
    { label: "National", icon: <FaLandmark />, value: "National" },
    { label: "Global", icon: <FaGlobe />, value: "Global" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-[#223843]">Define the Reach of Your Petition</h1>
      <p className="mt-2 text-[#223843]">Where should your petition make an impact?</p>

      <div className="mt-6 flex flex-wrap justify-center gap-4 md:flex-row flex-col">
        {scopes.map((item) => (
          <motion.button
            key={item.value}
            onClick={() => setScope(item.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
            className={`w-full md:w-28 h-24 flex flex-col items-center justify-center border-2 rounded-lg shadow-md transition-all duration-300
              ${
                scope === item.value
                  ? "bg-[#CA3C25] text-white border-[#CA3C25] shadow-lg"
                  : "bg-white border-[#223843] text-[#223843] hover:bg-[#F0F3EE] hover:shadow-lg transition-all duration-300"
              }
            `}
          >
            <motion.span
              className="text-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.1,
              }}
            >
              {item.icon}
            </motion.span>
            <span className="mt-1 font-semibold">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ScopeSelector;
