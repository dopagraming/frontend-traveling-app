import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Calendar, Star, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../rtk/features/wishlistSlice";
import { addToCart } from "../rtk/features/cartSlice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setTrips(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (tripId) => {
    dispatch(removeFromWishlist(tripId));
    setTrips(prev => prev.filter(trip => trip._id !== tripId));
    toast.success("Trip removed from wishlist");
  };

  const handleAddToCart = (trip) => {
    dispatch(addToCart(trip));
    toast.success("Trip added to your cart");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-soft-sand py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
            <div className="w-20 h-20 bg-natural-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-natural-blue" />
            </div>
            <h1 className="text-2xl font-bold text-deep-charcoal mb-4">Your Wishlist</h1>
            <p className="text-cool-gray mb-8 max-w-md mx-auto">Please sign in to view and manage your wishlist items</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-6 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-colors shadow-soft"
              >
                Sign In
              </Link>
              <Link
                to="/trips"
                className="px-6 py-3 border border-natural-blue text-natural-blue rounded-xl hover:bg-natural-blue/5 transition-colors"
              >
                Browse Trips
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="min-h-screen bg-soft-sand py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
            <div className="w-20 h-20 bg-natural-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-natural-blue" />
            </div>
            <h1 className="text-2xl font-bold text-deep-charcoal mb-4">Your Wishlist is Empty</h1>
            <p className="text-cool-gray mb-8 max-w-md mx-auto">Save your favorite trips to plan your next adventure</p>
            <Link
              to="/trips"
              className="px-6 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-colors shadow-soft inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Browse Trips
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-sand py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-deep-charcoal">Your Wishlist</h1>
          <Link
            to="/trips"
            className="text-natural-blue hover:text-natural-blue-dark transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Browsing
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id || trip.id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trip.imageCover || "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920"}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleRemoveFromWishlist(trip._id || trip.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-soft"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-cool-gray text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{trip.destination || "Unknown Location"}</span>
                </div>
                
                <h3 className="text-xl font-bold text-deep-charcoal mb-2 line-clamp-2">
                  {trip.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warm-orange fill-current" />
                    <span className="text-sm font-medium">{trip.ratingsAverage || "4.5"}</span>
                    <span className="text-sm text-cool-gray">({trip.ratingQuantity || "0"} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-cool-gray">
                    <Calendar className="h-4 w-4" />
                    <span>{trip.duration || "N/A"} days</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-cool-gray">From</span>
                    <span className="text-xl font-bold text-natural-blue ml-1">${trip.price}</span>
                  </div>
                  <span className="text-sm text-cool-gray">per person</span>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/trips/${trip._id || trip.id}`}
                    className="flex-1 py-2 text-center bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(trip)}
                    className="p-2 bg-warm-orange text-white rounded-lg hover:bg-warm-orange-dark transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;