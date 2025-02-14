"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { BsCheckSquare, BsSquare } from "react-icons/bs";

const petitionData = {
  scope: "National",
  category: "Health",
  location: "India",
  title: "Rare diseases policy fund not utilised by GOI, babies like Sera are battling to survive.",
  image: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=umFtOYrvwG4HIDCAskJ5U-2ncPlSoNXETjog2YbpC10=",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quibusdam earum fugit tenetur mollitia, facere architecto...",
  startedDate: "16 September 2023",
  petitionTo: "Dr. Mansukh Mandaviya (Union Minister for Health, Government of India)",
  currentSignatures: 76508,
  goalSignatures: 150000,
  weeklySignatures: 105,
};

const updates = [
  { text: "75,000 supporters", time: "2 months ago" },
  { text: "Michael Andrews started this petition", time: "1 year ago" },
];

const reasonsForSigning = [
  {
    name: "Kodi Wright",
    time: "1 year ago",
    reason: "I am signing because my son is 10 months old and was born with the same rare disease. This medication saved his life.",
    likes: 15,
  },
  {
    name: "Soumyajit Nandy",
    time: "1 year ago",
    reason: "Urgently, the GOI needs to support the families of children suffering from rare diseases and give them a ray of hope.",
    likes: 9,
  },
];

const PetitionPage = () => {
  const [signature, setSignature] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [displayName, setDisplayName] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="bg-[#E8EBE4] text-[#223843]">
      <div className="w-full p-6 bg-white shadow-lg">
        <div className="flex border-b">
          <button
            className={`py-2 px-6 text-lg font-semibold ${
              activeTab === "details" ? "text-[#CA3C25] border-b-4 border-[#CA3C25]" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Petition Details
          </button>
          <button
            className={`py-2 px-6 text-lg font-semibold ${
              activeTab === "comments" ? "text-[#CA3C25] border-b-4 border-[#CA3C25]" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
        </div>

        {activeTab === "details" ? (
          <>
            <h1 className="text-[#223843] text-3xl font-bold text-center mt-4 leading-snug">
              {petitionData.title}
            </h1>
            <p className="text-center text-sm text-gray-600 mt-2">
              <strong>Scope:</strong> {petitionData.scope} | <strong>Category:</strong> {petitionData.category} | <strong>Location:</strong> {petitionData.location}
            </p>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-start lg:gap-0.1"> {/* Added gap-2.5 for 10px gap */}
              <div className="lg:w-2/3">
                <Image
                  src={petitionData.image}
                  alt="Baby Sera"
                  width={700}
                  height={450}
                  className="rounded-xl shadow-md"
                  unoptimized={true}
                />
                <p className="text-[#223843] mt-4 leading-relaxed text-lg">{petitionData.description}</p>
                <h2 className="text-[#223843] text-2xl font-bold mt-8">Updates</h2>
                <div className="mt-4">
                  {updates.map((update, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
                      <p className="text-gray-700 font-medium">{update.text}</p>
                      <span className="text-gray-500 text-sm">{update.time}</span>
                    </div>
                  ))}
                </div>
               
              </div>

              {/* Petition Sign Box */}
              <div className=" bg-white p-6 rounded-xl shadow-md"> {/* This sets the gap between the two components */}
                <h3 className="text-[#223843] font-bold text-xl">Sign this petition</h3>
                <div className="text-center">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-700">{petitionData.currentSignatures.toLocaleString()}</span>
                    <span className="text-xl font-bold text-gray-600">{petitionData.goalSignatures.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-300 h-2 rounded-full mt-1">
                    <div
                      className="bg-purple-700 h-2 rounded-full"
                      style={{ width: `${(petitionData.currentSignatures / petitionData.goalSignatures) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 mt-2 font-semibold">
                    🤝 {petitionData.weeklySignatures} people signed this week
                  </p>
                </div>

                {/* Signature Form */}
                <div className="mt-6">
                  <h3 className="text-[#223843] font-bold text-xl">Sign this petition</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <FaUserCircle className="text-2xl text-gray-600" />
                    <span className="font-bold">Nikhil Sai</span>
                    <span className="text-gray-600">Visakhapatnam, India</span>
                    <MdModeEdit className="text-gray-500 cursor-pointer" />
                  </div>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3"
                    placeholder="I'm signing because... (optional)"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setDisplayName(!displayName)}>
                      {displayName ? <BsCheckSquare className="text-[#CA3C25] text-lg" /> : <BsSquare className="text-gray-600 text-lg" />}
                    </button>
                    <span className="text-gray-700">Display my name and comment on this petition</span>
                  </div>
                  <button
                    className="w-full py-3 mt-4 bg-[#CA3C25] hover:bg-red-700 text-white text-lg font-bold rounded-lg"
                  >
                    Sign this petition
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6">
            <h2 className="text-[#223843] text-2xl font-bold">Comments</h2>
            <div className="mt-4">
              {reasonsForSigning.map((reason, index) => (
                <div key={index} className="border-b py-3">
                  <p className="font-bold text-gray-800">
                    {reason.name} <span className="text-gray-500">• {reason.time}</span>
                  </p>
                  <p className="text-gray-700 mt-1">{reason.reason}</p>
                  <p className="text-gray-500 text-sm mt-1">❤️ {reason.likes} • Report</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetitionPage;
