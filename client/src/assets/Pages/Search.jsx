// Search.jsx
import React, { useState } from "react";

const Search = ({ foodItems, setFilteredFoodItems, setShowNoFoodMessage }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    const filteredItems = foodItems.filter((item) =>
      item.foodname.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredFoodItems(filteredItems);
    setShowNoFoodMessage(filteredItems.length === 0);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <input
        type="text"
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
