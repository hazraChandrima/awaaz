import React from "react";
import {
  FaHandsHelping,
  FaTree,
  FaBookOpen,
  FaLaptop,
  FaGlobe,
  FaFemale,
  FaChild,
  FaShieldAlt,
  FaHeart,
  FaMicroscope,
} from "react-icons/fa";

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const categories = [
  { name: "Human Rights", icon: <FaHandsHelping /> },
  { name: "Environment", icon: <FaTree /> },
  { name: "Education", icon: <FaBookOpen /> },
  { name: "Technology", icon: <FaLaptop /> },
  { name: "Global Issues", icon: <FaGlobe /> },
  { name: "Women Empowerment", icon: <FaFemale /> },
  { name: "Children’s Rights", icon: <FaChild /> },
  { name: "Safety & Security", icon: <FaShieldAlt /> },
  { name: "Health", icon: <FaHeart /> },
  { name: "Science & Research", icon: <FaMicroscope /> },
];

const CategorySelector: React.FC<Props> = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-[#223843] text-center">
        Select Your Petition Category
      </h2>
      <p className="text-sm sm:text-lg text-[#223843] mb-6 text-center">
        Choose a category that best describes your petition
      </p>

      {/* Category Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 w-full max-w-5xl">
        {categories.map(({ name, icon }) => (
          <button
            key={name}
            className={`flex flex-col items-center justify-center p-4 sm:p-6 text-sm sm:text-lg font-semibold border rounded-2xl shadow-md transition-all 
              w-[140px] sm:w-[160px] h-[100px] sm:h-[120px] 
              ${
                category === name
                  ? "bg-[#CA3C25] text-white shadow-lg scale-105" // Selected button
                  : "bg-[#F5F5F5] text-[#223843] hover:scale-105 transition-all" // Others (no red hover)
              }`}
            onClick={() => setCategory(name)}
          >
            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{icon}</span>
            <span className="text-center">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
