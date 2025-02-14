import React from 'react';
import Image from 'next/image';

const PetitionPage = () => {
  const petitionUrl = encodeURIComponent("https://yourpetitionlink.com");
  const shareText = encodeURIComponent("Support our cause to save local community gardens!");

  return (
    <div className="bg-[#E8EBE4] min-h-screen p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-6">
        
        {/* Title, Image & Sidebar */}
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Left Section */}
          <div className="lg:w-2/3">
            <div className="mb-4">
              <span className="text-[#223843] text-sm font-semibold">Environment</span>
              <span className="text-[#223843] text-sm font-semibold ml-2">Local Community</span>
              <h1 className="text-[#223843] text-4xl font-bold mt-2">Save Local Community Gardens</h1>
              <p className="text-[#223843] mt-1">Started by Sarah Johnson</p>
              <p className="text-[#223843]">Created on March 15, 2024 • Last updated 2 days ago</p>
              <p className="text-[#223843]">Portland, Oregon</p>
            </div>

            {/* Slightly Bigger Image */}
            <Image src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
            alt="Community Garden" width={300} height={100} className="rounded-2xl" />

            {/* Extended Content */}
            <div className="mt-6">
              <h2 className="text-[#223843] text-1xl font-bold">Background</h2>
              <p className="text-[#223843] mt-2">
                Our beloved community gardens are at risk of being replaced by a commercial development. These gardens have been a vital part of our neighborhood for over 20 years, providing fresh food, education, and a space for community gathering.
              </p>
              <p className="text-[#223843] mt-2">
                We're calling on the city council to protect these spaces and designate them as permanent community green spaces. Your signature can help preserve these important community resources for future generations.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-[#223843] text-1xl font-bold">Impact</h2>
              <ul className="list-disc list-inside text-[#223843] mt-2">
                <li>Weekly educational programs for 5 local schools</li>
                <li>Food donation program providing fresh produce to local food banks</li>
                <li>Community wellness workshops on sustainable gardening</li>
                <li>Employment opportunities for local residents</li>
              </ul>
            </div>
          </div>

          {/* Right Sidebar - Reduced Height */}
          <div className="lg:w-1/3 bg-[#E8EBE4] p-3 rounded-2xl shadow-lg lg:ml-6 mt-6 lg:mt-0 h-auto self-start">
            <h2 className="text-[#223843] text-xl font-bold">15,234 signatures</h2>
            <div className="bg-gray-300 rounded-full h-3 overflow-hidden mt-2">
              <div className="bg-[#223843] h-full rounded-full" style={{ width: '76%' }}></div>
            </div>
            <p className="text-[#223843] mt-2 font-semibold">Goal: 20,000</p>

            {/* Avatar Stack */}
            <div className="flex -space-x-2 mt-3">
              <img className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                   src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                   alt="Avatar" />
              <img className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                   src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                   alt="Avatar" />
              <img className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                   src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                   alt="Avatar" />
            </div>

            {/* Sign Petition Button */}
            <button className="bg-[#CA3C25] text-white py-2 px-6 rounded-2xl hover:bg-red-700 mt-4 w-full">
              Sign this Petition
            </button>

            {/* Share Buttons */}
            <div className="mt-4">
              <p className="text-[#223843] font-semibold">Share:</p>
              <div className="flex space-x-4 mt-2">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${petitionUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Facebook</a>
                <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${petitionUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white px-4 py-2 rounded-lg">Twitter</a>
                <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-3 py-2 rounded-lg">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetitionPage;
