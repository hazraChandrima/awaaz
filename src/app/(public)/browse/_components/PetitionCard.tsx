import React from "react";
import { FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import {format} from "date-fns";
import { IPetition } from "@/interfaces/Petition";
import Link from "next/link";

interface PetitionCardProps {
  petition: IPetition;
}

const PetitionCard: React.FC<PetitionCardProps> = ({ petition }) => {
  const date = new Date(petition.createdAt.seconds * 1000);

  const formattedDate = format(date, "do MMM yyyy");

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white flex">
      <div className="flex-1 p-4 flex flex-col justify-between border-r">
        <div>
          <Link href={`/petition/${petition.id}`} className="font-bold text-lg">{petition.title}</Link>
          <p className="text-gray-600 mt-1 line-clamp-3 text-sm">
            {petition.description}
          </p>
        </div>

        <hr className="border-gray-300 my-2" />

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <p>
              <span className="font-medium">Category:</span> {petition.category}
            </p>
            <p>
              <span className="font-medium">Location:</span> {petition.location}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-gray-500 text-xs">
            <FaEnvelope />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

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
