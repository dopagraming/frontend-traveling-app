import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CategoryFilter = ({ selectedCategories, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const categories = [
    { id: "hotels", name: "Hotels" },
    { id: "resorts", name: "Resorts" },
    { id: "villas", name: "Villas" },
    { id: "apartments", name: "Apartments" },
    { id: "hostels", name: "Hostels" },
    { id: "guesthouses", name: "Guest Houses" },
  ];

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium mb-2"
      >
        <span>Categories</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-md"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
