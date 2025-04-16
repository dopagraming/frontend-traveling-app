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
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
        {/* Price */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-emerald-600">
            ${trip?.price}
          </span>
          <span className="text-gray-600">per person</span>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          {/* Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participants
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={spotsRequested}
                onChange={(e) => setSpotsRequested(Number(e.target.value))}
                className="pl-10 block w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Adult{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
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

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          {/* Check Availability */}
          <button
            onClick={handleAvailabilityCheck}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Check Availability
          </button>
        </div>

        {/* Booking Section */}
        {isAvailable && (
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>
                Price ({spotsRequested}{" "}
                {spotsRequested > 1 ? "persons" : "person"})
              </span>
              <span>${trip?.price * spotsRequested}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${trip?.price * spotsRequested}</span>
            </div>
            <button
              onClick={handleBooking}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
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
