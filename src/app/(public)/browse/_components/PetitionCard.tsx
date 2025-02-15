import React from "react";
import { FaEnvelope } from "react-icons/fa";
import Image from "next/image";

interface Petition {
  id: string;
  title: string;
  description: string;
  image_url: string;
  location: string;
  category: string;
  goal: number;
  scope: string;
  userId: string;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

interface PetitionCardProps {
  petition: Petition;
}

const PetitionCard: React.FC<PetitionCardProps> = ({ petition }) => {
  // Convert timestamp to readable date
  const formattedDate = new Date(
    petition.createdAt.seconds * 1000
  ).toLocaleDateString();

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white flex">
      {/* Left - Content */}
      <div className="flex-1 p-4 flex flex-col justify-between border-r">
        {/* Title + Description */}
        <div>
          <h2 className="font-bold text-lg">{petition.title}</h2>
          <p className="text-gray-600 mt-1 line-clamp-3 text-sm">
            {petition.description}
          </p>
        </div>

        <hr className="border-gray-300 my-2" />

        {/* Petition Details */}
        <div className="flex justify-between items-center">
          {/* Location & Category */}
          <div className="text-xs text-gray-500">
            <p>
              <span className="font-medium">Category:</span> {petition.category}
            </p>
            <p>
              <span className="font-medium">Location:</span> {petition.location}
            </p>
          </div>

          {/* Signatures & Date */}
          <div className="flex items-center space-x-2 text-gray-500 text-xs">
            <FaEnvelope />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      <div className="w-56">
        <Image
          src={petition.image_url || "/placeholder.jpg"}
          width={200}
          height={100}
          alt={petition.title}
          className="w-full h-full object-cover rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default PetitionCard;
