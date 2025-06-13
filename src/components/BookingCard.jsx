import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";

const BookingCard = ({ trip }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [spotsRequested, setSpotsRequested] = useState(1);
  const [language, setLanguage] = useState("English");
  const [isAvailable, setIsAvailable] = useState(false);

  const handleAvailabilityCheck = async () => {
    try {
      const response = await api.post("/trips/checkavailability", {
        tripId: trip._id,
        availabilityId: selectedDate,
        spotsRequested,
      });

      if (response.data.availability) {
        setIsAvailable(true);
        toast.success("Date is available! You can proceed with booking.");
      } else {
        setIsAvailable(false);
        toast.error("No available spots! Please select another date.");
      }
    } catch (error) {
      setIsAvailable(false);
      toast.error("Failed to check availability. Please try again.");
    }
  };

  const handleBooking = async () => {
    try {
      const response = await api.post("/trips/checkavailability", {
        tripId: trip._id,
        availabilityId: selectedDate,
        spotsRequested,
      });

      if (response.data.availability) {
        navigate(`/booking/${trip._id}/${selectedDate}/${spotsRequested}`);
      } else {
        setIsAvailable(false);
        toast.error("No available spots! Please select another date.");
      }
    } catch (error) {
      toast.error("Failed to proceed. Please try again.");
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-soft-sand rounded-lg shadow-lg p-6 sticky top-8 border border-sea-blue/10">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-sea-blue">
            ${trip?.price}
          </span>
          <span className="text-cool-gray">per person</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep-charcoal mb-1">
              Participants
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sea-blue h-5 w-5" />
              <select
                value={spotsRequested}
                onChange={(e) => setSpotsRequested(Number(e.target.value))}
                className="pl-10 block w-full rounded-lg border-sea-blue/30 focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Adult{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-charcoal mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sea-blue h-5 w-5" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 block w-full rounded-lg border-sea-blue/30 focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
              >
                <option value="">Select a date</option>
                {trip?.availability?.map((date) => (
                  <option key={date._id} value={date._id}>
                    {format(new Date(date.date), "MMM d, yyyy")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-charcoal mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full rounded-lg border-sea-blue/30 focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          <button
            onClick={handleAvailabilityCheck}
            className="w-full bg-sea-blue text-white py-3 rounded-lg hover:bg-sea-blue-dark transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Check Availability
          </button>
        </div>

        {isAvailable && (
          <div className="mt-6 pt-6 border-t border-sea-blue/20 space-y-2">
            <div className="flex justify-between text-cool-gray">
              <span>
                Price ({spotsRequested}{" "}
                {spotsRequested > 1 ? "persons" : "person"})
              </span>
              <span>${trip?.price * spotsRequested}</span>
            </div>
            <div className="flex justify-between font-bold text-deep-charcoal pt-2 border-t border-sea-blue/20">
              <span>Total</span>
              <span>${trip?.price * spotsRequested}</span>
            </div>
            <button
              onClick={handleBooking}
              className="w-full bg-sunny-yellow text-deep-charcoal py-3 rounded-lg hover:bg-sunny-yellow-dark transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;