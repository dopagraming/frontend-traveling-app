import React from "react";
import { Link } from "react-router";
import SearchingResult from "./SearchingResult";

const MobileMenu = ({
  search,
  setSearch,
  searchDate,
  setSearchDate,
  data,
  isLoading,
  isError,
  searched,
  setIsOpen,
}) => {
  return (
    <div className="md:hidden pb-4">
      <div className="relative">
        {" "}
        <form className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Search
          </button>
        </form>
        <SearchingResult
          data={data}
          isLoading={isLoading}
          isError={isError}
          searched={searched}
        />
      </div>

      <Link
        to="/"
        className="block py-2 text-gray-600 hover:text-emerald-600"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/trips"
        className="block py-2 text-gray-600 hover:text-emerald-600"
        onClick={() => setIsOpen(false)}
      >
        Trips
      </Link>
      <Link
        to="/contact"
        className="block py-2 text-gray-600 hover:text-emerald-600"
        onClick={() => setIsOpen(false)}
      >
        Contact
      </Link>
      <Link
        to="/wishlist"
        className="block py-2 text-gray-600 hover:text-emerald-600"
        onClick={() => setIsOpen(false)}
      >
        Wishlist
      </Link>
      <Link
        to="/cart"
        className="block py-2 text-gray-600 hover:text-emerald-600"
        onClick={() => setIsOpen(false)}
      >
        Cart
      </Link>
    </div>
  );
};

export default MobileMenu;
