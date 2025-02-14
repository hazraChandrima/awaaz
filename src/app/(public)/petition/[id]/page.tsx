"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const PetitionPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [signature, setSignature] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const signatureRef = useRef<HTMLTextAreaElement | null>(null);
  const [comments, setComments] = useState([
    {
      name: "Alice Johnson",
      text: "This is such an important cause!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bob Smith",
      text: "I fully support this initiative!",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const petitionUrl = encodeURIComponent("https://yourpetitionlink.com");
  const shareText = encodeURIComponent(
    "Support our cause to save local community gardens!"
  );

  const handleSignPetition = () => {
    setShowSignatureModal(true);
  };

  // Handle the input for full name change
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    validateForm(value, signature);
  };

  // Handle the input for signature change
  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSignature(value);
    validateForm(fullName, value);
  };

  // Validate if both fields are filled
  const validateForm = (name: string, sig: string) => {
    if (name.trim() !== "" && sig.trim() !== "") {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { name: "You", text: newComment, img: "https://randomuser.me/api/portraits/lego/1.jpg" },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-[#ffffff] min-h-screen p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-6">
        {/* Title, Image & Sidebar */}
        <div className="flex justify-center flex-col lg:flex-row items-center text-center">
          <div className="lg:w-2/3">
            <div className="flex space-x-2 justify-center">
              <span className="bg-[#223843] text-white text-sm font-semibold px-3 py-1 rounded-full">
                Environment
              </span>
              <span className="bg-[#223843] text-white text-sm font-semibold px-3 py-1 rounded-full">
                Local Community
              </span>
            </div>
            <h1 className="text-[#223843] text-4xl font-bold mt-2">
              Save Local Community Gardens
            </h1>
            <div className="flex justify-center space-x-2 mt-1">
              <p className="text-[#223843] font-bold">Started by</p>
              <p className="text-[#223843]">Sarah Johnson</p>
            </div>
            <div className="flex justify-center space-x-2 mt-1">
              <p className="text-[#223843] font-bold">Created on</p>
              <p className="text-[#223843]">March 15, 2024 • Last updated 2 days ago</p>
            </div>
            <p className="text-[#223843] font-extrabold">Portland, Oregon</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between items-start mt-6">
          {/* Image Section */}
          <div className="lg:w-2/3">
            <Image
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Community Garden"
              width={700}
              height={200}
              className="rounded-2xl"
              style={{ height: "200px" }} ></Image>
            

            <div className="mt-6">
              <h2 className="text-[#223843] text-1xl font-bold">Background</h2>
              <p className="text-[#223843] mt-2">
                Our beloved community gardens are at risk of being replaced by a commercial development.
              </p>
              <p className="text-[#223843] mt-4">
                 Community gardens are more than just patches of green in urban landscapes—they are vibrant hubs of social interaction, education, and cultural exchange. These spaces provide residents with the opportunity to grow their own food, reducing dependency on commercially grown produce while promoting sustainable agriculture. Additionally, community gardens help reduce urban heat, support biodiversity by attracting pollinators, and improve air quality, making neighborhoods healthier and more enjoyable places to live. These gardens are especially vital in urban areas where green spaces are limited, offering a sanctuary where people can relax, reconnect with nature, and foster a sense of community.
                </p>
                <p className="text-[#223843] mt-4">
            Beyond their environmental benefits, community gardens play a crucial role in strengthening social bonds. They bring together people of all ages, backgrounds, and cultures, fostering a sense of belonging and shared purpose. 
                </p>

            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 bg-[#E8EBE4] p-3 rounded-2xl shadow-lg lg:ml-6 h-auto self-start">
            <h2 className="text-[#223843] text-xl font-bold">15,234 signatures</h2>
            <div className="bg-gray-300 rounded-full h-3 overflow-hidden mt-2">
              <div className="bg-[#223843] h-full rounded-full" style={{ width: "76%" }}></div>
            </div>
            <p className="text-[#223843] mt-2 font-semibold">Goal: 20,000</p>

            {/* Full Name Input and Signature */}
            <div className="mt-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your full name"
                value={fullName}
                onChange={handleFullNameChange}
              />
              <textarea
                ref={signatureRef}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your signature (text)"
                value={signature}
                onChange={handleSignatureChange}
              />
            </div>

            {/* Sign Petition Button */}
            <button
              onClick={() => {
                if (isFormComplete) {
                  setIsSigned(true);
                }
              }}
              className={`${
                isSigned ? "bg-green-700" : isFormComplete ? "bg-[#CA3C25]" : "bg-green-700"
              } text-white py-2 px-6 rounded-2xl hover:bg-green-700 mt-4 w-full`}
            >
              {isSigned ? "✔ Signed" : "Sign this Petition"}
            </button>

            {/* Share Buttons */}
            <div className="mt-4">
              <p className="text-[#223843] font-semibold">Share:</p>
              <div className="flex space-x-4 mt-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${petitionUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${petitionUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.instagram.com/?url=${petitionUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                >
                  Instagram
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetitionPage;
