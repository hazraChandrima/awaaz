"use client";
import { useState, useEffect } from "react";
import PetitionList from "./_components/PetitionList";
import BrowseFilters from "./_components/BrowseFilters";
import { IPetition } from "@/interfaces/Petition";

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [petitions, setPetitions] = useState<IPetition[]>([]);
  const [filteredPetitions, setFilteredPetitions] = useState<IPetition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch petitions on mount
  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/petitions");
        if (!response.ok) throw new Error("Failed to fetch petitions");

        const data = await response.json();

        if (Array.isArray(data.petitions)) {
          setPetitions(data.petitions);
          setFilteredPetitions(data.petitions);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, []);

  // Filter petitions when the search query changes
  useEffect(() => {
    applyFilter();
  }, [searchQuery]);

  const applyFilter = () => {
    const newFiltered = petitions.filter((petition) =>
      petition.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPetitions(newFiltered);
  };

  if (loading) return <p className="text-center">Loading petitions...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="lg:px-20">
      <h1 className="text-3xl font-bold mb-4">Discover Petitions to Sign</h1>

      {/* Tabs and Search Filter */}
      <BrowseFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        applyFilter={applyFilter}
      />

      {/* Petition List */}
      <div className="mt-6">
        <PetitionList petitions={filteredPetitions} />
      </div>
    </div>
  );
}
