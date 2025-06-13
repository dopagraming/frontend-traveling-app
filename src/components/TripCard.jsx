import React from "react";
import { useNavigate } from "react-router-dom";
import { Share2, Heart, ShoppingCart, Star, MapPin, Clock, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/features/cartSlice";
import { addToWishlist } from "../rtk/features/wishlistSlice";
import toast from "react-hot-toast";

const TripCard = ({ trip }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(trip));
    toast.success("Trip added to your cart");
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    dispatch(addToWishlist(trip));
    toast.success("Trip added to your wishlist");
  };

  const shareTrip = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: trip?.title,
        text: trip?.description,
        url: `${window.location.origin}/trips/${trip._id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/trips/${trip._id}`);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleCardClick = () => {
    navigate(`/trips/${trip._id}`);
  };

  return (
    <div className="relative group">
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-300 cursor-pointer relative border border-natural-blue/10 hover:border-natural-blue/30 transform hover:-translate-y-2"
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={trip.imageCover}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {trip.priceDiscount && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Sale
              </span>
            )}
            <span className="bg-warm-orange text-deep-charcoal px-2 py-1 rounded-full text-xs font-medium">
              {trip.type?.charAt(0).toUpperCase() + trip.type?.slice(1) || 'Featured'}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-warm-orange fill-current" />
            <span className="text-xs font-medium text-deep-charcoal">
              {trip.ratingsAverage || '4.5'}
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center gap-1 text-cool-gray text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{trip.destination}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-deep-charcoal mb-3 line-clamp-2 group-hover:text-natural-blue transition-colors">
            {trip.title}
          </h3>

          {/* Trip Details */}
          <div className="flex items-center gap-4 text-sm text-cool-gray mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{trip.duration} days</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Small group</span>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(trip.ratingsAverage || 4.5)
                      ? 'text-warm-orange fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-cool-gray">
              ({trip.ratingQuantity || 0} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {trip.priceDiscount && (
                <span className="text-sm text-cool-gray line-through">
                  ${trip.priceDiscount}
                </span>
              )}
              <span className="text-xl font-bold text-natural-blue">
                ${trip.price}
              </span>
            </div>
            <span className="text-sm text-cool-gray">per person</span>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between text-sm text-cool-gray mb-4">
            <span>
              {trip.availability?.length > 0 
                ? `${trip.availability.length} dates available`
                : 'Limited availability'
              }
            </span>
            <span>
              {trip.availability?.[0]?.availableSpots 
                ? `${trip.availability[0].availableSpots} spots left`
                : 'Book soon'
              }
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleCardClick}
            className="w-full py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors font-medium shadow-blue hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 top-[calc(50%-96px)] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
        <button
          onClick={handleAddToWishlist}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-soft"
          title="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-deep-charcoal hover:text-red-500" />
        </button>
        
        <button
          onClick={handleAddToCart}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-soft"
          title="Add to cart"
        >
          <ShoppingCart className="w-4 h-4 text-deep-charcoal hover:text-warm-orange" />
        </button>
        
        <button
          onClick={shareTrip}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-soft"
          title="Share trip"
        >
          <Share2 className="w-4 h-4 text-deep-charcoal hover:text-natural-blue" />
        </button>
      </div>
    </div>
  );
};

export default TripCard;