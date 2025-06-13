import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Palmtree as PalmTree, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import useSearch from "../hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { setUser } from "../rtk/features/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [search, setSearch] = useState("");
  const searched = useSearch(search);
  const dispatch = useDispatch();
  const path = useLocation();

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and get user data
      const fetchUser = async () => {
        try {
          const response = await api.get("/auth/me");
          dispatch(setUser(response.data.user));
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, [dispatch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search-trips", searched],
    queryFn: async () => {
      const res = await api.post("/trips/search-trips", {
        keyword: searched,
        date: searchDate,
      });
      return res.data;
    },
    enabled: searched.trim().length > 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });

  return (
    <header
      className={
        path.pathname.split("/")[1] === "admin" ||
        path.pathname.split("/")[1] === "signin"
          ? `hidden`
          : "bg-soft-sand shadow-lg px-4 border-b border-sea-blue/10"
      }
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex flex-[.1] items-center space-x-2">
            <PalmTree className="h-8 w-8 text-sea-blue" />
            <span className="text-xl font-bold text-deep-charcoal">DopaCode</span>
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
            <Link to="/" className="text-cool-gray hover:text-sea-blue transition-colors">
              Home
            </Link>
            <Link to="/trips" className="text-cool-gray hover:text-sea-blue transition-colors">
              Trips
            </Link>
            <Link
              to="/contact"
              className="text-cool-gray hover:text-sea-blue transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/wishlist"
              className="text-cool-gray hover:text-sea-blue transition-colors"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-cool-gray hover:text-sea-blue transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <UserMenu />
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