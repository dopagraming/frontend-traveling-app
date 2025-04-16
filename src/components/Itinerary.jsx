import React from "react";

const Itinerary = ({trip}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-6">Itinerary</h2>
      <div className="relative">
        {trip.tripRoute?.map((item, index) => (
          <div key={index} className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                {item.icon}
              </div>
              {index < trip?.tripRoute?.length - 1 && (
                <div className="absolute top-10 left-5 w-0.5 h-full bg-blue-200" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{item.location}</h3>
              {item.duration && (
                <p className="text-sm text-gray-600">{item.duration}</p>
              )}
              {item.activity && (
                <p className="text-gray-700">{item.activity}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
