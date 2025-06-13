import { useState } from "react";

const citiesInTurkey = [
  "Istanbul",
  "Ankara",
  "Izmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Konya",
  "Gaziantep",
  "Kayseri",
  "Mersin",
  "Diyarbakir",
  "Samsun",
  "Eskisehir",
];

const categories = ["Hotels", "Villas", "Hostels", "Resorts"];

export default function FilterSidebar({ onApply }) {
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  const handleApply = () => {
    onApply({ sort, city, minPrice, maxPrice, language, category });
    setShowFilters(false);
  };

  return (
    <>
      <div className="md:hidden flex justify-end p-4 sticky-bottom">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:block w-full md:w-64 p-4 bg-white shadow-md rounded-md md:sticky md:top-5`}
      >
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Recommended</option>
            <option value="price">Price - Low To High</option>
            <option value="-price">Price - High To Low</option>
            <option value="-ratingsAverage">Rating</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm"
          >
            <option value="">All Cities</option>
            {citiesInTurkey.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="w-1/2 rounded-xl border border-gray-300 p-3 text-sm"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="w-1/2 rounded-xl border border-gray-300 p-3 text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm"
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="tr">Turkish</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c.toLowerCase()}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-xl mt-2"
        >
          Apply
        </button>
      </div>
    </>
  );
}
