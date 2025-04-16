import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Calendar, Star } from "lucide-react";
import { trips } from "../data/trips";

// Mock wishlist data
const wishlistItems = ["1"];

const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link
            to="/trips"
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Trips
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((itemId) => {
            const trip = trips.find((t) => t.id === itemId);
            if (!trip) return null;

            return (
              <div
                key={itemId}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={trip.images[0]}
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-white text-red-600">
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {trip.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      <span>{trip.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{trip.duration} days</span>
                    </div>
                    <span className="text-xl font-bold text-emerald-600">
                      ${trip.price}
                    </span>
                  </div>
                  <Link
                    to={`/trips/${trip.id}`}
                    className="block w-full text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
