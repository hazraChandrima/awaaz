"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUsers, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const petitionData = [
  {
    id: 1,
    title: 'Place "Zero Tolerance for Sexual Harassment" Board on IIIT Delhi Campus',
    description:
      "Pragya Sikka's petition, signed by 8,229 supporters, led to the ICC at IIIT-Delhi proactively taking steps to build a safer campus for all students.",
    image: "https://www.shutterstock.com/image-vector/vector-flat-horizontal-banner-international-260nw-2350189727.jpg",
    user: { name: "Pragya Sikka", country: "India" },
    supporters: 8229,
    createdAt: "12/01/24",
  },
  {
    id: 2,
    title: "Justice for Illegal Arrest of Innocent Indian Citizens by Nigerian Naval Forces",
    description: "Seeking justice for arrested Indian citizens in Nigeria.",
    image: "https://www.shutterstock.com/shutterstock/photos/1662288790/display_1500/stock-vector-hands-of-women-wearing-bangles-concept-for-women-s-day-1662288790.jpg",
    user: { name: "Rahul Sharma", country: "India" },
    supporters: 10456,
    createdAt: "28/11/23",
  },
  {
    id: 3,
    title: "Petition to Ministry of Sports to Enable U23 Football Team to Participate in Asian Games.",
    description: "Government needs to allow the U23 Football team to participate in the Asian Games.",
    image: "https://www.shutterstock.com/shutterstock/photos/1785411101/display_1500/stock-vector-men-women-athletes-doing-exercises-working-out-outdoors-set-people-training-street-workout-1785411101.jpg",
    user: { name: "Amit Kumar", country: "India" },
    supporters: 15230,
    createdAt: "03/02/24",
  },
];

export default function CustomCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % petitionData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + petitionData.length) % petitionData.length);
  };

  return (
    <div className="relative w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Trending</h1>
      </div>
      <div className="relative w-full min-h-[260px] overflow-hidden rounded-none shadow-lg group">
        <Image
          src={petitionData[activeIndex].image}
          alt={petitionData[activeIndex].title}
          layout="fill"
          className="object-cover w-full h-full transition-opacity group-hover:opacity-90"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black/70 group-hover:from-black/80 transition-all duration-300">
          <h3 className="text-white text-2xl font-bold">
            {petitionData[activeIndex].title}
          </h3>

          <p className="text-gray-200 text-lg mt-3 line-clamp-3">
            {petitionData[activeIndex].description}
          </p>

          <div className="flex items-center gap-5 mt-5 text-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-bold">
                  {petitionData[activeIndex].user.name[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-xl">
                  {petitionData[activeIndex].user.name}
                </p>
                <p className="text-gray-300 text-sm">
                  {petitionData[activeIndex].user.country}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-gray-300 text-lg">
            <div className="flex items-center gap-2">
              <FaUsers />
              <span>
                {petitionData[activeIndex].supporters.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <span>{petitionData[activeIndex].createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {petitionData.map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-2xl transition-all ${
              activeIndex === i ? "w-12 bg-white" : "w-6 bg-white/50"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition flex items-center"
      >
        <FaChevronLeft size={16} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition flex items-center"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
}
