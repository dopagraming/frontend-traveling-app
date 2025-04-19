import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Palmtree as PalmTree, ShoppingCart } from "lucide-react";
import useSearch from "../hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [search, setSearch] = useState("");
  const searched = useSearch(search);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search-trips", searched],
    queryFn: async () => {
      const res = await api.post("/trips/search-trips", {
        keyword: searched,
      });
      console.log(res.data);
      return res.data;
    },
    enabled: searched.trim().length > 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
  const path = useLocation();
  return (
    <header
      className={
        path.pathname.split("/")[1] === "admin" ||
        path.pathname.split("/")[1] === "signin"
          ? `hidden`
          : "bg-white shadow-lg px-4"
      }
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex flex-[.1] items-center space-x-2">
            <PalmTree className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">DopaCode</span>
          </Link>
          <SearchBar
            data={data}
            isLoading={isLoading}
            isError={isError}
            searched={searched}
            setSearchDate={setSearchDate}
            searchDate={searchDate}
            setSearch={setSearch}
            search={search}
          />
          <div className="hidden md:flex items-center space-x-8 flex-[.3] justify-end">
            <Link to="/" className="text-gray-600 hover:text-emerald-600">
              Home
            </Link>
            <Link to="/trips" className="text-gray-600 hover:text-emerald-600">
              Trips
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-emerald-600"
            >
              Contact
            </Link>
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-emerald-600"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-emerald-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
          <MobileMenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>

        {isOpen && (
          <MobileMenu
            data={data}
            isLoading={isLoading}
            isError={isError}
            searched={searched}
            setSearchDate={setSearchDate}
            searchDate={searchDate}
            setSearch={setSearch}
            search={search}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
