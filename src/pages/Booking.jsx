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
      console.log(error);
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
    <div className="min-h-[calc(100vh-4rem)] flex">
      <div className="w-full lg:w-1/2 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Book Your Trip</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Travelers
              </label>
              <input
                disabled={true}
                type="number"
                value={spots}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Selected Date
              </label>
              <input
                disabled={true}
                type="text"
                value={format(new Date(selectedDate.date), "MMM d, yyyy")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                {...register("paymentMethod")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="">Select payment method</option>
                <option value="card">Credit/Debit Card</option>
                <option value="crypto">Cryptocurrency (USDT)</option>
              </select>
              {errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 bg-gray-50 p-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={trip.images[0]}
              alt={trip.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {trip.title}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{trip.duration} days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>1-10 travelers</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Multiple dates available</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Trip Highlights</h3>
                <ul className="space-y-2">
                  {trip.itinerary.map((day, index) => (
                    <li key={day.day} className="flex items-start">
                      <span className="h-2 w-2 bg-emerald-400 rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-600">{day}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-md">Per person</span>
                  <span className="text-md font-bold text-emerald-600">
                    ${trip.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total : </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${trip.price * spots}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
