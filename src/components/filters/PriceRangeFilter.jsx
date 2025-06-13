import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PriceRangeFilter = ({ min, max, onChangeMin, onChangeMax }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMinChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === "" || /^\d+$/.test(value)) {
      onChangeMin(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === "" || /^\d+$/.test(value)) {
      onChangeMax(value);
    }
  };

  return (
    <div>
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium mb-2"
      >
        <span>Price Range</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label
                htmlFor="price-min"
                className="block text-xs text-gray-600 mb-1"
              >
                Min
              </label>
              <input
                id="price-min"
                type="text"
                placeholder="0"
                value={min}
                onChange={handleMinChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <span className="text-gray-400 pt-5">—</span>
            <div className="flex-1">
              <label
                htmlFor="price-max"
                className="block text-xs text-gray-600 mb-1"
              >
                Max
              </label>
              <input
                id="price-max"
                type="text"
                placeholder="Any"
                value={max}
                onChange={handleMaxChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;
