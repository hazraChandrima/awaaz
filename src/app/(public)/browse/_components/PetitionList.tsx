import React from "react";
import PetitionCard from "./PetitionCard";
import { Petition } from "../types";


interface PetitionListProps {
  petitions: Petition[];
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
