import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, Star, Clock, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import TripCard from "../components/TripCard";
import useGetItems from "../hooks/useGetProducts";
import api from "../lib/axios";

const Trips = () => {
  const location = useLocation();
  const { data: allTrips, isLoading, error } = useGetItems("trips");
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    destination: "",
    priceRange: "",
    duration: "",
    type: "",
    sort: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle search results from hero section
  useEffect(() => {
    if (location.state?.searchResults) {
      setTrips(location.state.searchResults);
      setSearchTerm(location.state.searchTerm || "");

      // Clear the location state to prevent issues on refresh
      window.history.replaceState({}, document.title);
    } else {
      setTrips(allTrips);
    }
  }, [allTrips, location.state]);

  const handleSearch = async () => {
    console.log("here in handle search");
    if (!searchTerm.trim()) {
      setTrips(allTrips);
      return;
    }

    try {
      const response = await api.post("/trips/search-trips", {
        keyword: searchTerm,
      });
      setTrips(response.data);
    } catch (error) {
      console.error("Search error:", error);
      setTrips([]);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filteredTrips = [...allTrips];

    // Apply destination filter
    if (filters.destination) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.destination
          ?.toLowerCase()
          .includes(filters.destination.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type) {
      filteredTrips = filteredTrips.filter(
        (trip) => trip.type === filters.type
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filteredTrips = filteredTrips.filter((trip) => {
        const price = trip.price;
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // Apply duration filter
    if (filters.duration) {
      const duration = parseInt(filters.duration);
      filteredTrips = filteredTrips.filter((trip) => {
        if (duration === 1) return trip.duration <= 3;
        if (duration === 7) return trip.duration >= 4 && trip.duration <= 7;
        if (duration === 14) return trip.duration >= 8;
        return true;
      });
    }

    // Apply sorting
    if (filters.sort) {
      filteredTrips.sort((a, b) => {
        switch (filters.sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
          case "duration":
            return a.duration - b.duration;
          default:
            return 0;
        }
      });
    }

    setTrips(filteredTrips);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      destination: "",
      priceRange: "",
      duration: "",
      type: "",
      sort: "",
    });
    setSearchTerm("");
    setTrips(allTrips);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">
            Loading amazing trips...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft text-center">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-cool-gray mb-6">
            We couldn't load the trips. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-natural-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {location.state?.searchTerm
              ? `Search Results for "${location.state.searchTerm}"`
              : "Discover Amazing Trips"}
          </h1>
          <p className="text-xl opacity-90">
            {location.state?.searchTerm
              ? `Found ${trips.length} trips matching your search`
              : "Find your perfect adventure from our curated collection"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
            >
              Search
            </button>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-natural-blue text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-natural-blue/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Any destination"
                    value={filters.destination}
                    onChange={(e) =>
                      handleFilterChange("destination", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Trip Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="">All Types</option>
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="family">Family</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) =>
                      handleFilterChange("priceRange", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="">Any Price</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000-2000">$1000 - $2000</option>
                    <option value="2000">$2000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Duration
                  </label>
                  <select
                    value={filters.duration}
                    onChange={(e) =>
                      handleFilterChange("duration", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="">Any Duration</option>
                    <option value="1">1-3 days</option>
                    <option value="7">4-7 days</option>
                    <option value="14">8+ days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={applyFilters}
                  className="px-6 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 border border-natural-blue text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-deep-charcoal">
              {searchTerm ? `Search Results for "${searchTerm}"` : "All Trips"}
            </h2>
            <p className="text-cool-gray mt-1">
              Showing {trips.length} of {allTrips.length} amazing destinations
            </p>
          </div>
        </div>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-natural-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-natural-blue" />
            </div>
            <h3 className="text-xl font-bold text-deep-charcoal mb-2">
              No trips found
            </h3>
            <p className="text-cool-gray mb-6">
              {searchTerm || Object.values(filters).some((f) => f)
                ? "Try adjusting your search or filters to find more trips."
                : "No trips are available at the moment."}
            </p>
            {(searchTerm || Object.values(filters).some((f) => f)) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {trips.length > 0 && trips.length >= 12 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
              Load More Trips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
