"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const dummyData = [
  {
    id: 1,
    title: 'Place "Zero Tolerance for Sexual Harassment" Board on IIIT Delhi Campus',
    description:
      "Pragya Sikka's petition, signed by 8,229 supporters, led to the ICC at IIIT-Delhi proactively taking steps to build a safer campus for all students.",
    image: "/assets/1.jpeg",
    supporters: 8222,
    link: "#",
  },
  {
    id: 2,
    title: "Justice for Illegal Arrest of Innocent Indian Citizens by Nigerian Naval Forces",
    description: "Seeking justice for arrested Indian citizens in Nigeria.",
    image: "/assets/2.jpeg",
    supporters: 5000,
    link: "#",
  },
  {
    id: 3,
    title: "Petition to Ministry of Sports to Enable U23 Football Team to Participate in Asian Games.",
    description: "Government needs to allow the U23 Football team to participate in the Asian Games.",
    image: "/assets/3.jpeg",
    supporters: 10000,
    link: "#",
  },
];

export default function Carousel() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-lg shadow-md"
      >
        {dummyData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.description}</p>
                <div className="text-gray-300 mt-2">{item.supporters} Supporters</div>
                <Link href={item.link} className="text-blue-300 mt-2">
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
