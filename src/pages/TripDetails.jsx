import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { toast } from "react-hot-toast";
import api from "../lib/axios";
import TripHeader from "../components/TripHeader";
import TripImages from "../components/TripImages";
import Details from "../components/Details";
import Itinerary from "../components/Itinerary";
import Reviews from "../components/Reviews";
import BookingCard from "../components/BookingCard";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`trips/${id}`);
      setTrip(response.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(trip);
  }, [trip]);

  if (!trip) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Trip not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TripHeader trip={trip} />

      {trip?.images?.length >= 1 && <TripImages trip={trip} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Details trip={trip} />

          <Itinerary trip={trip} />

          <Reviews trip={trip} />
        </div>

          <BookingCard trip={trip}/>
      </div>
    </div>
  );
};

export default TripDetails;
