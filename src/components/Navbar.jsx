import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Palmtree as PalmTree,
  Search,
  Heart,
  ShoppingCart,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", { query: searchQuery, date: searchDate });
  };
  const path = useLocation();
  return (
    <nav
      className={
        path.pathname.split("/")[1] === "admin" ||
        path.pathname.split("/")[1] === "signin"
          ? `hidden`
          : "bg-white shadow-lg "
      }
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PalmTree className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">
              aladinconcierge
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8"
          >
            <div className="flex-1 flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
