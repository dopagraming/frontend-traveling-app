import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Users, MapPin, Clock } from "lucide-react";

import api from "../lib/axios";
import { DisplayErrors } from "../utils/index";
import { format } from "date-fns";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  paymentMethod: z.enum(["card", "crypto"], {
    required_error: "Please select a payment method",
  }),
});

const Booking = () => {
  const { tripId, dateId, spots } = useParams();
  const [trip, setTrip] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Loading");
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.post(`/trips/checkavailability`, {
          tripId: tripId,
          availabilityId: dateId,
          spotsRequested: spots,
        });
        if (response.data.availability) {
          console.log(response.data);
          setTrip(response.data.trip);
          setSelectedDate(response.data.selectedDate);
          setLoading(true);
        } else {
          setStatus("Trip Not Found");
        }
      } catch (error) {
        DisplayErrors(error);
        setStatus("404 Not Found");
      }
    };
    fetchTrip();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post(`/order/checkout-session/${tripId}`, {
        tripId,
        dateId,
        spots,
        data,
      });
      window.location.href = res.data.session.url;
    } catch (error) {
      DisplayErrors(error);
    }
  };

  if (!loading) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <p className="text-center text-gray-600">{status}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50">
      <div className="w-full lg:w-1/2 p-6 sm:p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8"
        >
          <h2 className="text-3xl font-bold text-emerald-600">
            Traveler Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-medium">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="Enter your first name"
                className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Enter your last name"
                className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400  focus:outline-none"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400  focus:outline-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">Phone</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+1234567890"
                className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400  focus:outline-none"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Travelers
                </label>
                <input
                  type="number"
                  value={spots}
                  disabled
                  className="mt-1 w-full p-3 bg-gray-100 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Selected Date
                </label>
                <input
                  type="text"
                  value={format(new Date(selectedDate.date), "MMM d, yyyy")}
                  disabled
                  className="mt-1 w-full p-3 bg-gray-100 rounded-xl border border-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                {...register("paymentMethod")}
                className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none"
              >
                <option value="">Select payment method</option>
                <option value="card">Credit/Debit Card</option>
                <option value="crypto">Cryptocurrency (USDT)</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>

      <div className="hidden lg:block w-1/2 p-6 sm:p-5">
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <img
            src={trip.images[0]}
            alt={trip.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{trip.title}</h2>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span>{trip.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <span>1–10 travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span>Multiple dates available</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Trip Highlights
              </h3>
              <ul className="space-y-2 list-none">
                {trip.itinerary.map((day) => (
                  <li key={day?._id} className="flex items-start">
                    <span className="mt-2 rounded-full bg-emerald-500 mr-3 w-full block text-white ps-2">
                      {day?.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-md text-gray-600">
                <span>Per person</span>
                <span className="font-bold text-emerald-600">
                  ${trip.price}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-emerald-600">${trip.price * spots}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
