import React from "react";
import { Search } from "lucide-react";
import SearchingResult from "./SearchingResult";

const SearchBar = ({
  search,
  setSearch,
  data,
  isLoading,
  isError,
  searched,
}) => {
  return (
    <div className="relative flex-[.5]">
      <div className="hidden md:block w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 py-1 w-full rounded-3xl border border-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <SearchingResult
        data={data}
        isLoading={isLoading}
        isError={isError}
        searched={searched}
        setSearch={setSearch}
      />
    </div>
  );
};

export default SearchBar;
