"use client"
import { useState, useEffect } from "react";
import PetitionList from "./_components/PetitionList";
import BrowseFilters from "./_components/BrowseFilters";
import { IPetition } from "@/interfaces/Petition";

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [petitions, setPetitions] = useState([]);
  const [filteredPetitions, setFilteredPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const response = await fetch("/api/petitions");
        if (!response.ok) throw new Error("Failed to fetch petitions");
        const data = await response.json();
        console.log(data);
        setPetitions(data.petitions);
        setFilteredPetitions(data.petitions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [searchQuery]);

  const applyFilter = () => {
    const newFiltered = petitions.filter((petition: IPetition) =>
      petition.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPetitions(newFiltered);
  };

  if (loading) return (
    <div className="text-center">
      <div className="border-t-4 border-red-500 border-solid rounded-full w-16 h-16 animate-spin mx-auto"></div>
    </div>
  );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="lg:px-20">
      <h1 className="text-3xl font-bold mb-4">Discover Petitions to Sign</h1>

      <BrowseFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        applyFilter={applyFilter}
      />

      <div className="mt-6">
        <PetitionList petitions={filteredPetitions} />
      </div>
    </div>
  );
}
