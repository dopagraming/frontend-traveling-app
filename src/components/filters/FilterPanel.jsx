import React, { useState } from "react";
import { X, FilterIcon, ChevronDown, ChevronUp } from "lucide-react";
import SortFilter from "./SortFilter";
import CityFilter from "./CityFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import LanguageFilter from "./LanguageFilter";
import CategoryFilter from "./CategoryFilter";

const FilterPanel = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    sort: "",
    city: "",
    priceMin: "",
    priceMax: "",
    language: "en",
    categories: [],
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      sort: "",
      city: "",
      priceMin: "",
      priceMax: "",
      language: "en",
      categories: [],
    });
  };

  return (
    <div className="w-full">
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-3 bg-white rounded-xl border border-gray-300 shadow-sm text-gray-700"
        >
          <div className="flex items-center">
            <FilterIcon size={18} className="mr-2" />
            <span>Filters</span>
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div
        className={`
        lg:block
        ${isOpen ? "block" : "hidden"}
        mt-2 lg:mt-0
        bg-white rounded-xl border border-gray-300 shadow-sm
        p-4 lg:p-5
        lg:sticky lg:top-20
        max-h-[80vh] lg:max-h-[calc(100vh-8rem)]
        overflow-y-auto
      `}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h3 className="font-medium text-lg">Filters</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="hidden lg:block mb-4">
          <h3 className="font-medium text-lg">Filters</h3>
        </div>

        <div className="space-y-6">
          <SortFilter
            value={filters.sort}
            onChange={(value) => handleFilterChange("sort", value)}
          />

          <div className="border-t border-gray-200 pt-4"></div>
          <CityFilter
            value={filters.city}
            onChange={(value) => handleFilterChange("city", value)}
          />

          <div className="border-t border-gray-200 pt-4"></div>
          <PriceRangeFilter
            min={filters.priceMin}
            max={filters.priceMax}
            onChangeMin={(value) => handleFilterChange("priceMin", value)}
            onChangeMax={(value) => handleFilterChange("priceMax", value)}
          />

          <div className="border-t border-gray-200 pt-4"></div>
          <LanguageFilter
            value={filters.language}
            onChange={(value) => handleFilterChange("language", value)}
          />

          <div className="border-t border-gray-200 pt-4"></div>
          <CategoryFilter
            selectedCategories={filters.categories}
            onChange={(value) => handleFilterChange("categories", value)}
          />
        </div>

        <div className="mt-6 flex flex-col space-y-2">
          <button
            onClick={handleApplyFilters}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors duration-200"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
