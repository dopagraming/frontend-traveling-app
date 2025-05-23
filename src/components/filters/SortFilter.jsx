import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SortFilter = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sortOptions = [
    { value: "", label: "Recommended" },
    { value: "price", label: "Price - Low To High" },
    { value: "-price", label: "Price - High To Low" },
    { value: "-ratingsAverage", label: "Rating" },
  ];

  return (
    <div>
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium mb-2"
      >
        <span>Sort By</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-md"
            >
              <input
                type="radio"
                name="sortOption"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortFilter;
