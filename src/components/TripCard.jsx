import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Star } from "lucide-react";
import { format } from "date-fns";

const TripCard = ({ trip }) => {
  const nextAvailableDate = trip.availability[0].date;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={trip.imageCover}
          alt={trip.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-emerald-600">
          ${trip.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {trip.title}
        </h3>
        <div className="flex items-center space-x-1 text-yellow-400 mb-2">
          <Star className="h-5 w-5 fill-current" />
          <span className="text-gray-700">{trip.ratingsAverage}</span>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{trip.destination}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              Next available:{" "}
              {format(new Date(nextAvailableDate), "MMM d, yyyy")}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>
        <Link
          to={`/trips/${trip.id}`}
          className="block w-full text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TripCard;
