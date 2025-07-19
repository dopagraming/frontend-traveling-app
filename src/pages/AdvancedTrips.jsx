import React, { useState, useEffect } from "react";
import {
  Filter,
  Search,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  Calendar,
  Users,
  DollarSign,
  Play,
  MessageCircle,
  Zap,
  Award,
  Timer,
  RotateCcw,
  ChevronDown,
  X,
  Eye,
  GitCompare as Compare,
} from "lucide-react";

const AdvancedTrips = () => {
  const [filters, setFilters] = useState({
    type: "",
    duration: "",
    priceRange: [0, 2000],
    rating: 0,
    showCompleted: false,
  });

  const [sortBy, setSortBy] = useState("recommended");
  const [searchTerm, setSearchTerm] = useState("");
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock trips data
  const trips = [
    {
      id: 1,
      title: "Pyramids Discovery Tour",
      location: "Giza, Egypt",
      duration: "3 days",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400&h=300&fit=crop",
      video: "https://example.com/video1.mp4",
      type: "cultural",
      badges: ["New", "Popular"],
      discount: 25,
      timeLeft: "48:30:15",
      description:
        "Discover the wonders of ancient Egypt with a comprehensive tour of the pyramids and sphinx",
      included: ["Transport", "Breakfast", "Tour Guide"],
      groupSize: "8-15 people",
      completed: false,
    },
    {
      id: 2,
      title: "Desert Adventure",
      location: "Dubai, UAE",
      duration: "1 day",
      price: 199,
      originalPrice: 249,
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&h=300&fit=crop",
      video: "https://example.com/video2.mp4",
      type: "adventure",
      badges: ["Limited Offer"],
      discount: 20,
      timeLeft: "72:15:30",
      description:
        "Thrilling desert experience with dune bashing, camel riding, and traditional dinner",
      included: ["4WD Safari", "Camel Ride", "BBQ Dinner"],
      groupSize: "6-12 people",
      completed: false,
    },
    {
      id: 3,
      title: "Tropical Paradise Retreat",
      location: "Maldives",
      duration: "7 days",
      price: 1299,
      originalPrice: 1599,
      rating: 4.7,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      video: "https://example.com/video3.mp4",
      type: "relaxation",
      badges: ["Luxury"],
      discount: 19,
      timeLeft: "120:45:20",
      description:
        "Ultimate relaxation in overwater villas with pristine beaches and crystal clear waters",
      included: ["Villa Stay", "All Meals", "Spa Access"],
      groupSize: "2-4 people",
      completed: true,
    },
  ];

  const tripTypes = [
    { value: "family", label: "Family" },
    { value: "adventure", label: "Adventure" },
    { value: "relaxation", label: "Relaxation" },
    { value: "cultural", label: "Cultural" },
    { value: "luxury", label: "Luxury" },
  ];

  const durations = [
    { value: "1", label: "1 day" },
    { value: "3", label: "2-3 days" },
    { value: "7", label: "1 week" },
    { value: "14", label: "2 weeks" },
    { value: "30", label: "1 month+" },
  ];

  const filteredTrips = trips.filter((trip) => {
    if (filters.showCompleted && !trip.completed) return false;
    if (!filters.showCompleted && trip.completed) return false;
    if (filters.type && trip.type !== filters.type) return false;
    if (filters.rating && trip.rating < filters.rating) return false;
    if (
      trip.price < filters.priceRange[0] ||
      trip.price > filters.priceRange[1]
    )
      return false;
    if (
      searchTerm &&
      !trip.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return 0; // Would implement geolocation logic
      default:
        return 0;
    }
  });

  const addToCompare = (trip) => {
    if (compareList.length < 3 && !compareList.find((t) => t.id === trip.id)) {
      setCompareList([...compareList, trip]);
    }
  };

  const removeFromCompare = (tripId) => {
    setCompareList(compareList.filter((t) => t.id !== tripId));
  };

  const CountdownTimer = ({ timeLeft }) => {
    const [time, setTime] = useState(timeLeft);

    useEffect(() => {
      const timer = setInterval(() => {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(timer);
          return;
        }

        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;

        setTime(
          `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`
        );
      }, 1000);

      return () => clearInterval(timer);
    }, [time]);

    return (
      <div className="flex items-center gap-1 text-red-600 font-mono text-sm">
        <Timer className="w-4 h-4" />
        <span>{time}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-natural-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Trips
          </h1>
          <p className="text-xl opacity-90">
            Find your perfect adventure from our curated collection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-natural-blue/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Trip Type */}
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Trip Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="">All Types</option>
                    {tripTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Duration
                  </label>
                  <select
                    value={filters.duration}
                    onChange={(e) =>
                      setFilters({ ...filters, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="">Any Duration</option>
                    {durations.map((duration) => (
                      <option key={duration.value} value={duration.value}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Price Range: ${filters.priceRange[0]} - $
                    {filters.priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [
                          filters.priceRange[0],
                          parseInt(e.target.value),
                        ],
                      })
                    }
                    className="w-full"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
                  >
                    <option value="0">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
              </div>

              {/* Show Completed Toggle */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showCompleted"
                  checked={filters.showCompleted}
                  onChange={(e) =>
                    setFilters({ ...filters, showCompleted: e.target.checked })
                  }
                  className="w-4 h-4 text-natural-blue rounded focus:ring-natural-blue"
                />
                <label
                  htmlFor="showCompleted"
                  className="text-sm text-deep-charcoal"
                >
                  Show completed trips only
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="bg-warm-orange/10 border border-warm-orange/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Compare className="w-5 h-5 text-warm-orange" />
                <span className="font-medium text-deep-charcoal">
                  Compare ({compareList.length}/3)
                </span>
                <div className="flex gap-2">
                  {compareList.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center gap-1 bg-white px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">
                        {trip.title.substring(0, 20)}...
                      </span>
                      <button
                        onClick={() => removeFromCompare(trip.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowComparison(true)}
                className="px-4 py-2 bg-warm-orange text-deep-charcoal rounded-lg hover:bg-warm-orange-dark transition-colors"
              >
                Compare Now
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-cool-gray">
            Showing {sortedTrips.length} of {trips.length} trips
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cool-gray">View:</span>
            <button className="p-2 bg-natural-blue text-white rounded">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className="bg-current"></div>
                <div className="bg-current"></div>
                <div className="bg-current"></div>
                <div className="bg-current"></div>
              </div>
            </button>
            <button className="p-2 text-cool-gray hover:text-natural-blue">
              <div className="space-y-1 w-4 h-4">
                <div className="h-1 bg-current"></div>
                <div className="h-1 bg-current"></div>
                <div className="h-1 bg-current"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTrips.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {trip.badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        badge === "New"
                          ? "bg-green-500 text-white"
                          : badge === "Popular"
                          ? "bg-warm-orange text-deep-charcoal"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Discount */}
                {trip.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    -{trip.discount}%
                  </div>
                )}

                {/* Video Preview */}
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="w-6 h-6 text-natural-blue" />
                  </div>
                </button>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-deep-charcoal hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-deep-charcoal" />
                  </button>
                  <button
                    onClick={() => addToCompare(trip)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Compare className="w-4 h-4 text-deep-charcoal" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-deep-charcoal group-hover:text-natural-blue transition-colors line-clamp-1">
                      {trip.title}
                    </h3>
                    <div className="flex items-center gap-1 text-cool-gray text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warm-orange fill-current" />
                    <span className="text-sm font-medium">{trip.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-cool-gray text-sm mb-4 line-clamp-2">
                  {trip.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-cool-gray">
                    <Clock className="w-4 h-4" />
                    <span>{trip.duration}</span>
                    <Users className="w-4 h-4 ml-2" />
                    <span>{trip.groupSize}</span>
                  </div>

                  {trip.timeLeft && <CountdownTimer timeLeft={trip.timeLeft} />}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {trip.originalPrice && (
                      <span className="text-sm text-cool-gray line-through mr-2">
                        ${trip.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-natural-blue">
                      ${trip.price}
                    </span>
                    <span className="text-sm text-cool-gray ml-1">
                      per person
                    </span>
                  </div>
                  <div className="text-right text-sm text-cool-gray">
                    {trip.reviews} reviews
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-natural-blue text-white py-3 rounded-lg hover:bg-natural-blue-dark transition-colors font-medium">
                    Book Now
                  </button>
                  <button className="px-4 py-3 border border-natural-blue text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
            Load More Trips
          </button>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-natural-blue/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-deep-charcoal">
                  Compare Trips
                </h2>
                <button
                  onClick={() => setShowComparison(false)}
                  className="p-2 hover:bg-cool-gray/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-4 font-medium text-deep-charcoal">
                        Feature
                      </th>
                      {compareList.map((trip) => (
                        <th key={trip.id} className="text-center p-4">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                          />
                          <div className="font-medium text-deep-charcoal">
                            {trip.title}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-natural-blue/20">
                      <td className="p-4 font-medium">Price</td>
                      {compareList.map((trip) => (
                        <td key={trip.id} className="p-4 text-center">
                          <span className="text-xl font-bold text-natural-blue">
                            ${trip.price}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-natural-blue/20">
                      <td className="p-4 font-medium">Duration</td>
                      {compareList.map((trip) => (
                        <td key={trip.id} className="p-4 text-center">
                          {trip.duration}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-natural-blue/20">
                      <td className="p-4 font-medium">Rating</td>
                      {compareList.map((trip) => (
                        <td key={trip.id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-warm-orange fill-current" />
                            <span>{trip.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-natural-blue/20">
                      <td className="p-4 font-medium">Group Size</td>
                      {compareList.map((trip) => (
                        <td key={trip.id} className="p-4 text-center">
                          {trip.groupSize}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedTrips;
