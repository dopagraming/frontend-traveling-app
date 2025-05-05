import React from "react";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/features/cartSlice";
import { addToWishlist } from "../rtk/features/wishlistSlice";
import toast from "react-hot-toast";

const TripCard = ({ trip }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    dispatch(addToCart(e));
    toast.success("Trip Add To Your Cart");
  };
  const handleAddToWishlist = (e) => {
    dispatch(addToWishlist(e));
    toast.success("Trip Add To Your Wishlist");
  };
  const shareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: trip?.title,
        text: trip?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="relative group">
      <div
        key={trip.id}
        className=" bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer relative "
        onClick={() => navigate(`/trips/${trip.id}`)}
      >
        <div className="relative h-48">
          <img
            src={trip.imageCover}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-emerald-600 text-white px-2 py-1 rounded-md text-sm">
            Top Pick
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {trip.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>{trip.duration}</span>
            <span>•</span>
            <span>Skip the line</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(trip?.ratingsAverage))}
              {"☆".repeat(5 - Math.floor(trip?.ratingsAverage))}
            </div>
            <span className="text-sm text-gray-600">
              ({trip.ratingQuantity})
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <p className="text-sm">Number of travelers 20</p>
            <p className="text-sm">(8 availabile)</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">From</span>
              <span className="text-lg font-bold text-gray-900 ml-1">
                ${trip.price}
              </span>
            </div>
            <span className="text-sm text-gray-500">per person</span>
          </div>
        </div>
      </div>
      <div className="absolute right-[10px] top-[calc(50%-96px)] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
        <Heart
          onClick={() => handleAddToWishlist(trip)}
          className="mb-2 text-pink-500 bg-white rounded-full p-2 w-8 h-8 shadow-md hover:bg-slate-300"
        />
        <ShoppingCart
          onClick={() => handleAddToCart(trip)}
          className="mb-2 text-amber-500 bg-white rounded-full p-2 w-8 h-8 shadow-md hover:bg-slate-300"
        />
        <Share2
          onClick={() => shareTrip()}
          className="text-sky-500 bg-white rounded-full p-2 w-8 h-8 shadow-md hover:bg-slate-100 transition"
        />
      </div>
    </div>
  );
};

export default TripCard;
