import React from "react";
import { Petition } from "../types";
import { FaEnvelope } from "react-icons/fa";

interface PetitionCardProps {
  petition: Petition;
}

const PetitionCard: React.FC<PetitionCardProps> = ({ petition }) => {
  const sampleAvatars = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8MHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  ];

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white flex">
      {/* Left - Main Content */}
      <div className="flex-1 p-4 flex flex-col justify-between border-r">
        {/* Title + Description */}
        <div>
          <h2 className="font-bold text-lg">{petition.title}</h2>
          <p className="text-gray-600 mt-1 line-clamp-3 text-sm">{petition.description}</p>
        </div>

        <hr className="border-gray-300 my-2" />
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Author"
              className="w-7 h-7 rounded-full"
            />
            <div className="text-xs">
              <span className="font-medium">{petition.author}</span>
              <p className="text-gray-500">India</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                {sampleAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt="Supporter"
                    className="w-6 h-6 rounded-full border border-white"
                  />
                ))}
              </div>
              <span className="text-xs font-medium">{petition.signatures.toLocaleString()}+</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <FaEnvelope />
              <span>{petition.date}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-56">
        <img
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt={petition.title}
          className="w-full h-full object-cover rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default PetitionCard;
