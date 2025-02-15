import React from "react";
import PetitionCard from "./PetitionCard";
import { Petition } from "../types";
import { IPetition } from "@/interfaces/Petition";


interface PetitionListProps {
  petitions: IPetition[];
}

const PetitionList: React.FC<PetitionListProps> = ({ petitions }) => {
  return (
    <div className="space-y-4">
      {petitions.map((petition) => (
        <PetitionCard key={petition.id} petition={petition} />
      ))}
    </div>
  );
};

export default PetitionList;
