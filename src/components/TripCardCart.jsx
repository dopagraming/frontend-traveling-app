import React from "react";
import { Trash2, Calendar } from "lucide-react";

const TripCardCart = ({ trip, item }) => {
  return (
    <div key={item.tripId} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        <img
          src={trip.images[0]}
          alt={trip.title}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {trip.title}
            </h3>
            <button className="text-red-600 hover:text-red-700">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-2">{trip.destination}</p>
          <div className="flex items-center text-gray-600 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{item.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              {item.participants}{" "}
              {item.participants > 1 ? "participants" : "participant"} •{" "}
              {item.language}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              ${trip.price * item.participants}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCardCart;
