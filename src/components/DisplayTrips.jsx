import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";

const DisplayTrips = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data?.map((item) => (
        <TripCard trip={item} />
      ))}
    </div>
  );
};

export default DisplayTrips;
