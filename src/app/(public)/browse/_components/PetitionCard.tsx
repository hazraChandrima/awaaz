import React from "react";
import { FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { IPetition } from "@/interfaces/Petition";
import Link from "next/link";

interface PetitionCardProps {
  petition: IPetition;
}

const PetitionCard: React.FC<PetitionCardProps> = ({ petition }) => {
  let date: Date;

  if (petition.createdAt instanceof Timestamp) {
    date = petition.createdAt.toDate();
  } else {
    date = new Date(petition.createdAt);
  }

  const formattedDate = format(date, "do MMM yyyy");

  return (
    <div>
      <Link href={`/petition/${petition.id}`}>
        <div className="border-2 rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col md:flex-row overflow-hidden">
          {/* Text Content */}
          <div className="flex-1 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r">
            <div>
              <h2 className="font-bold text-lg  hover:underline">
                {petition.title}
              </h2>
              <p className="text-gray-600 mt-2 line-clamp-3 text-sm">
                {petition.description}
              </p>
            </div>

            <hr className="border-gray-300 my-3" />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs text-gray-500">
              <div>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {petition.category}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {petition.location}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <FaEnvelope className="text-gray-400" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-56 h-40 md:h-auto relative">
            <Image
              src={petition.image_url || "/placeholder.jpg"}
              layout="fill"
              objectFit="cover"
              alt={petition.title}
              className="rounded-b-lg md:rounded-b-none md:rounded-r-lg"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PetitionCard;
