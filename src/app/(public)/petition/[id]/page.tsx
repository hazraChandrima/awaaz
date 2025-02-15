"use client";

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import ShareModal from "../_components/ShareModal";
import OTPVerification from "../../../components/OTPVerification";
import { auth } from "../../../../firebase";
import { User, onAuthStateChanged } from "firebase/auth";

interface PetitionData {
  signed_users: string[];
  goal: number;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  userId: string;
  scope: string;
  title: string;
  location: string;
  image_url: string | null;
  description: string;
  category: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

const PetitionPage = ({ params }: PageProps) => {
  const [petitionData, setPetitionData] = useState<PetitionData | null>(null);
  const [signature, setSignature] = useState("");
  const [displayName, setDisplayName] = useState(true);
  const [activeTab, setActiveTab] = useState("details"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Add a loading state
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); 
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const shareUrl = `http://localhost:3000/petition/${petitionData?.id || ''}`;
  
  useEffect(() => {
    const fetchPetitionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/petitions/${params.id}`
        );
        const data = await response.json();
        setPetitionData(data);
        setIsLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching petition data:", error);
        setIsLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchPetitionData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="border-t-4 border-red-500 border-solid rounded-full w-16 h-16 animate-spin mx-auto"></div>
      </div>
    );
  }

  if (!petitionData) return <div>Error loading petition data...</div>;

  return (
    <div className="bg-[#E8EBE4] text-[#223843]">
      <div className="w-full p-6 bg-white shadow-lg">
        <div className="flex border-b">
          <button
            className={`py-2 px-6 text-lg font-semibold ${activeTab === "details" ? "text-[#CA3C25] border-b-4 border-[#CA3C25]" : "text-gray-600"}`}
            onClick={() => setActiveTab("details")}
          >
            Petition Details
          </button>
          <button
            className={`py-2 px-6 text-lg font-semibold ${activeTab === "comments" ? "text-[#CA3C25] border-b-4 border-[#CA3C25]" : "text-gray-600"}`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
        </div>

        {activeTab === "details" ? (
          <>
            <h1 className="text-[#223843] text-3xl font-bold text-center mt-4 leading-snug">{petitionData.title}</h1>
            <p className="text-center text-sm text-gray-600 mt-2">
              <strong>Scope:</strong> {petitionData.scope} | <strong>Category:</strong> {petitionData.category} | <strong>Location:</strong> {petitionData.location}
            </p>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-start lg:gap-2.5">
              <div className="lg:w-2/3">
                <img
                  src={petitionData.image_url || "https://via.placeholder.com/600x400"}
                  alt="Petition Image"
                  className="rounded-xl shadow-md"
                />
                <p className="text-[#223843] mt-4 leading-relaxed text-lg">{petitionData.description}</p>
                <h2 className="text-[#223843] text-2xl font-bold mt-8">Updates</h2>
                <div className="mt-4">
                  <div className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
                    <p className="text-gray-700 font-medium">Initial petition created</p>
                    <span className="text-gray-500 text-sm">1 day ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-[#223843] font-bold text-xl">Sign this petition</h3>
                <div className="text-center">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#CA3C25]">{petitionData.signed_users.length.toLocaleString()}</span>
                    <span className="text-xl font-bold text-gray-600">{petitionData.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-300 h-2 rounded-full mt-1">
                    <div
                      className="bg-[#CA3C25] h-2 rounded-full"
                      style={{ width: `${(petitionData.signed_users.length / petitionData.goal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 mt-2 font-semibold">
                    🤝 {petitionData.signed_users.length} people signed this petition
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-[#223843] font-bold text-xl">Sign this petition</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <FaUserCircle className="text-2xl text-gray-600" />
                    <span className="font-bold">{currentUser?.displayName}</span>
                    <span className="text-gray-600">Your Location</span>
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
                    onClick={() => {
                      if (currentUser) {
                        setShowOTPVerification(true);
                      } else {
                        window.location.href = '/sign-in';
                      }
                    }}
                  >
                    {isSigning ? 'Signing...' : 'Sign this petition'}
                  </button>
                  {signatureError && (
                    <p className="text-red-500 text-sm mt-2">{signatureError}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6">
            <h2 className="text-[#223843] text-2xl font-bold">Comments</h2>
            <div className="mt-4">
              <div className="border-b py-3">
                <p className="font-bold text-gray-800">
                  User Name <span className="text-gray-500">• Time Ago</span>
                </p>
                <p className="text-gray-700 mt-1">Reason for signing...</p>
                <p className="text-gray-500 text-sm mt-1">❤️ Likes • Report</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        shareUrl={shareUrl} 
        signatureCount={0} 
      />
      
      {showOTPVerification && (
        <OTPVerification
          onVerify={async (phoneNumber: string, otp: string) => {
            try {
              const response = await fetch(
                `/api/petitions/${params.id}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: currentUser?.uid,
                    phoneNumber,
                    otp
                  }),
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
              }

              setIsModalOpen(true);
              // Refresh petition data
              const updatedResponse = await fetch(
                `/api/petitions/${params.id}`
              );
              const updatedData = await updatedResponse.json();
              setPetitionData(updatedData);
              
              return true;
            } catch (error) {
              setSignatureError(error instanceof Error ? error.message : "Failed to sign petition");
              return false;
            }
          }}
          onClose={() => setShowOTPVerification(false)}
        />
      )}
    </div>
  );
};

export default PetitionPage;
