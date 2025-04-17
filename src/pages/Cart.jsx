import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Calendar } from "lucide-react";
import { trips } from "../data/trips";

const cartItems = [
  {
    tripId: "1",
    participants: 2,
    date: "2024-04-15",
    language: "English",
  },
];

const Cart = () => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const trip = trips.find((t) => t.id === item.tripId);
      if (!trip) return total;
      const subtotal = trip.price * item.participants;
      const serviceFee = Math.round(subtotal * 0.1);
      return total + subtotal + serviceFee;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/trips"
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Trips
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const trip = trips.find((t) => t.id === item.tripId);
              if (!trip) return null;

              return (
                <div
                  key={item.tripId}
                  className="bg-white rounded-lg shadow-md p-6"
                >
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
                          {item.participants > 1
                            ? "participants"
                            : "participant"}{" "}
                          • {item.language}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${trip.price * item.participants}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const trip = trips.find((t) => t.id === item.tripId);
                  if (!trip) return null;

                  const subtotal = trip.price * item.participants;
                  const serviceFee = Math.round(subtotal * 0.1);

                  return (
                    <div key={item.tripId}>
                      <div className="flex justify-between text-gray-600">
                        <span>{trip.title}</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Service fee</span>
                        <span>${serviceFee}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
