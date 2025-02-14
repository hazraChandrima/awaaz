import React from "react";

interface Props {
  scope: string;
  location: string;
  category: string;
  title: string;
  description: string;
  image: File | string | null; // Allow both File and URL string
  submitPetition: () => void;
}

const ReviewAndPublish: React.FC<Props> = ({ scope, location, category, title, description, image, submitPetition }) => {
  // Determine correct image source
  const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#223843] mb-4">Review Your Petition</h2>
      <p className="text-gray-600 mb-4">Double-check the details before publishing. You can still go back and edit.</p>

      {/* Petition Details */}
      <div className="space-y-3">
        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Scope</p>
          <p className="text-gray-700">{scope || <span className="italic text-gray-500">Not specified</span>}</p>
        </div>

        {location && (
          <div className="border-b pb-2">
            <p className="text-lg font-semibold text-[#CA3C25]">Location</p>
            <p className="text-gray-700">{location}</p>
          </div>
        )}

        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Category</p>
          <p className="text-gray-700">{category || <span className="italic text-gray-500">Not specified</span>}</p>
        </div>
      </div>

      {/* Image - Now Full Width of Card */}
      <div className="mt-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Petition Preview"
            className="mt-2 rounded-lg shadow-md border border-gray-300 w-full object-cover max-h-80"
          />
        ) : (
          <p className="text-gray-500 italic mt-1 text-center">No image uploaded</p>
        )}
      </div>

      {/* Title & Description */}
      <div className="mt-4 space-y-3">
        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Title</p>
          <p className="text-gray-800 font-bold">{title || <span className="italic text-gray-500">No title provided</span>}</p>
        </div>

        <div>
          <p className="text-lg font-semibold text-[#CA3C25]">Description</p>
          <p className="text-gray-700">{description || <span className="italic text-gray-500">No description provided</span>}</p>
        </div>
      </div>

      {/* Publish Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-3 bg-[#CA3C25] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          onClick={submitPetition}
        >
          🚀 Publish Petition
        </button>
      </div>
    </div>
  );
};

export default ReviewAndPublish;
