import { MapPin, Clock, Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../rtk/features/wishlistSlice";

const TripHeader = ({ trip }) => {
  const [isWishlisted, setIsWishlist] = useState();
  const dispatch = useDispatch();
  const handleAddToWishlist = (e) => {
    dispatch(addToWishlist(e));
    setIsWishlist(true);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
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
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{trip?.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{trip?.destination}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>{trip?.duration} days</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            <span>
              {trip?.ratingsAverage} ({trip?.reviews?.length} reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleAddToWishlist(trip)}
          className={`p-2 rounded-full ${
            isWishlisted
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          } hover:bg-gray-200`}
        >
          <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={shareTrip}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Share2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TripHeader;
