import React from "react";
import { FaSearch } from "react-icons/fa";

interface BrowseFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  applyFilter: () => void;
}

const BrowseFilters: React.FC<BrowseFiltersProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  applyFilter,
}) => {
  const tabs = ["Featured", "Popular", "Recent", "Victories"];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b pb-2 space-y-2 md:space-y-0">
      {/* Tabs */}
      <div className="flex space-x-4 overflow-x-auto md:overflow-visible">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-2 font-medium whitespace-nowrap ${
              activeTab === tab.toLowerCase()
                ? "text-[#CA3C25] border-b-2 border-[#CA3C25]"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Input & Button */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search petitions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#CA3C25] w-full md:w-auto"
        />

        {/* Search Button (Flipped Icon) */}
        <button
          onClick={applyFilter}
          className="p-2 rounded-md bg-[#CA3C25] text-white hover:bg-red-600 transition"
        >
          <FaSearch className="text-lg transform scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
};

export default BrowseFilters;
