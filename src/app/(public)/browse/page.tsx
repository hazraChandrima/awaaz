"use client";
import { useState, useEffect } from "react";
import PetitionList from "./_components/PetitionList";
import BrowseFilters from "./_components/BrowseFilters";

const petitionsData = [
  {
    id: 1,
    title: "Rare diseases policy fund not utilised by GOI...",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, a esse reiciendis fuga, placeat itaque repudiandae laboriosam molestiae laudantium voluptates, corrupti minima impedit possimus consectetur ullam exercitationem officiis sequi blanditiis repellat dolorem temporibus! Labore eveniet hic quam tempore voluptatem quaerat consequuntur, unde, consectetur harum nulla excepturi. Officia vero quia ducimus facilis cupiditate inventore dolorem voluptatibus dolorum unde, eum doloremque ullam, tempore corrupti obcaecati quibusdam ea saepe excepturi expedita error explicabo illum deserunt. Tenetur excepturi delectus odio omnis ipsum eius laborum aut error quibusdam, animi eligendi, molestiae numquam eos eum! Ea, reiciendis aut quam quidem excepturi quae eum omnis blanditiis nihil.",
    author: "Michael Andrews",
    signatures: 76502,
    date: "16/09/23",
    image: "img/cardimage1.png",
  },
  {
    id: 2,
    title: "Revise Tax Deductions under 80DD...",
    description:" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, a esse reiciendis fuga, placeat itaque repudiandae laboriosam molestiae laudantium voluptates, corrupti minima impedit possimus consectetur ullam exercitationem officiis sequi blanditiis repellat dolorem temporibus! Labore eveniet hic quam tempore voluptatem quaerat consequuntur, unde, consectetur harum nulla excepturi. Officia vero quia ducimus facilis cupiditate inventore dolorem voluptatibus dolorum unde, eum doloremque ullam, tempore corrupti obcaecati quibusdam ea saepe excepturi expedita error explicabo illum deserunt. Tenetur excepturi delectus odio omnis ipsum eius laborum aut error quibusdam, animi eligendi, molestiae numquam eos eum! Ea, reiciendis aut quam quidem excepturi quae eum omnis blanditiis nihil.",
    author: "Poonam D",
    signatures: 47473,
    date: "30/09/23",
    image: "/images/disability-tax.jpg",
  },
];

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPetitions, setFilteredPetitions] = useState(petitionsData);

  // Filter as the user types
  useEffect(() => {
    applyFilter();
  }, [searchQuery]);

  // Function to apply filtering when the button is clicked
  const applyFilter = () => {
    const newFiltered = petitionsData.filter((petition) =>
      petition.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPetitions(newFiltered);
  };

  return (
    <div className="lg:px-20">
      <h1 className="text-3xl font-bold mb-4">Discover Petitions to Sign</h1>

      {/* Tabs and Search Filter */}
      <BrowseFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        applyFilter={applyFilter} // ✅ Pass applyFilter for button click
      />

      {/* Petition List */}
      <div className="mt-6">
        <PetitionList petitions={filteredPetitions} />
      </div>
    </div>
  );
}
