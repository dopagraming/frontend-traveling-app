import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import TripCard from "./TripCard";

const DisplayTrips = ({ data }) => {
  return (
    <section className="px-4 md:px-12 container mx-auto my-5">
      <h2 className="text-2xl font-bold mb-6">
        Unforgettable cultural experiences
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((item) => (
          <TripCard trip={item} />
        ))}
      </div>
    </section>
  );
};

export default DisplayTrips;
