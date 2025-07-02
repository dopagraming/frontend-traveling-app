import React, { useState, useEffect } from "react";
import { Star, MapPin, Heart, Share2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "../lib/axios";
import { addToWishlist } from "../rtk/features/wishlistSlice";

const TopDestinations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/trips/popular-destinations");

        if (response.data && response.data.data) {
          // Transform the aggregated data to match our component needs
          const transformedDestinations = response.data.data.map(
            (dest, index) => ({
              id: index + 1,
              name: dest.destination,
              image:
                dest.sampleImage ||
                "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
              rating: Number(dest.averageRating?.toFixed(1)),
              reviews: dest.tripCount,
              price: `$${dest.priceRange?.min}`,
              description: `Discover ${dest.destination} with ${
                dest.tripCount
              } amazing ${dest.tripCount === 1 ? "trip" : "trips"} available`,
              category: "Popular Destination",
              priceRange: dest.priceRange,
            })
          );

          setDestinations(transformedDestinations);
        }
      } catch (error) {
        console.error("Error fetching popular destinations:", error);
        setError("Failed to load destinations");

        // Fallback to static data if API fails
        // const fallbackDestinations = [
        //   {
        //     id: 1,
        //     name: "Santorini, Greece",
        //     image:
        //       "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
        //     rating: 4.9,
        //     reviews: 2847,
        //     price: "$299",
        //     description: "Stunning sunsets and white-washed buildings",
        //     category: "Island Paradise",
        //   },
        //   {
        //     id: 2,
        //     name: "Kyoto, Japan",
        //     image:
        //       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=300&fit=crop",
        //     rating: 4.8,
        //     reviews: 1923,
        //     price: "$399",
        //     description: "Ancient temples and cherry blossoms",
        //     category: "Cultural Heritage",
        //   },
        //   {
        //     id: 3,
        //     name: "Machu Picchu, Peru",
        //     image:
        //       "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=300&fit=crop",
        //     rating: 4.9,
        //     reviews: 3156,
        //     price: "$599",
        //     description: "Mystical ancient Incan citadel",
        //     category: "Adventure",
        //   },
        // ];
        // setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  const handleAddToWishlist = (destination) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    // Create a trip-like object for wishlist
    const tripData = {
      _id: `dest-${destination.id}`,
      title: `Explore ${destination.name}`,
      destination: destination.name,
      imageCover: destination.image,
      price: parseInt(destination.price.replace("$", "")),
      ratingsAverage: destination.rating,
      ratingQuantity: destination.reviews,
      description: destination.description,
    };

    dispatch(addToWishlist(tripData));
    toast.success(`${destination.name} added to your wishlist`);
  };

  const handleShare = (destination) => {
    if (navigator.share) {
      navigator.share({
        title: `Visit ${destination.name}`,
        text: destination.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleExploreDestination = (destination) => {
    // Navigate to trips page with destination filter
    navigate("/trips", {
      state: {
        searchResults: [],
        searchTerm: destination.name,
        filters: { destination: destination.name },
      },
    });
  };

  const handleViewAllDestinations = () => {
    navigate("/trips");
  };

  if (loading) {
    return (
      <section className="py-20 bg-soft-sand dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-warm-orange/20 text-warm-orange-dark rounded-full text-sm font-medium mb-4">
              {t("destinations.popularDestinations")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal dark:text-white mb-6">
              {t("destinations.topDestinations")}
            </h2>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft animate-pulse"
              >
                <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && destinations.length === 0) {
    return (
      <section className="py-20 bg-soft-sand dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft max-w-md mx-auto">
            <h3 className="text-xl font-bold text-deep-charcoal dark:text-white mb-4">
              Unable to Load Destinations
            </h3>
            <p className="text-cool-gray dark:text-gray-400 mb-6">
              We're having trouble loading the popular destinations. Please try
              again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-soft-sand dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-warm-orange/20 text-warm-orange-dark rounded-full text-sm font-medium mb-4">
            {t("destinations.popularDestinations")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal dark:text-white mb-6">
            {t("destinations.topDestinations")}
          </h2>
          <p className="text-xl text-cool-gray dark:text-gray-400 max-w-2xl mx-auto">
            {t("destinations.subtitle")}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop";
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-deep-charcoal text-sm font-medium rounded-full">
                    {destination.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleAddToWishlist(destination)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className="w-4 h-4 text-deep-charcoal hover:text-red-500" />
                  </button>
                  <button
                    onClick={() => handleShare(destination)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-deep-charcoal" />
                  </button>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-deep-charcoal dark:text-white group-hover:text-natural-blue transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warm-orange fill-current" />
                    <span className="text-sm font-medium text-deep-charcoal dark:text-white">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-cool-gray dark:text-gray-400 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-cool-gray dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {destination.reviews}{" "}
                      {destination.reviews === 1 ? "trip" : "trips"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-cool-gray dark:text-gray-400">
                      {t("destinations.from")}
                    </span>
                    <div className="text-xl font-bold text-natural-blue">
                      {destination.price}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleExploreDestination(destination)}
                  className="w-full mt-4 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-all duration-300 font-medium shadow-blue hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t("destinations.exploreNow")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleViewAllDestinations}
            className="inline-flex items-center px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1"
          >
            {t("destinations.viewAllDestinations")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Error Message (if any) */}
        {error && destinations.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-cool-gray dark:text-gray-400">
              Some destinations may not be up to date. Showing cached results.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDestinations;
