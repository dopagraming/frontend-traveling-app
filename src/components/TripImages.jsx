import React from "react";

const TripImages = ({ trip }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6 relative h-[500px] overflow-hidden rounded-xl">
        <img
          src={trip?.images[0]}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="col-span-3 relative h-[500px] overflow-hidden rounded-xl">
        <img
          src={trip?.images[1] || "img"}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="col-span-3 space-y-4">
        <div className="relative h-[242px] overflow-hidden rounded-xl">
          <img
            src={trip?.images[2] || "img"}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-[242px] overflow-hidden rounded-xl group">
          <img
            src={trip?.images[3] || "img"}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">
              +{trip.images.length - 4} more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripImages;
