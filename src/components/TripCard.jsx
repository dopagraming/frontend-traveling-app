import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Star } from "lucide-react";
import { format } from "date-fns";

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  return (
    <div
      key={trip.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
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
          <span className="text-sm text-gray-600">({trip.ratingQuantity})</span>
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
  );
};

export default TripCard;
