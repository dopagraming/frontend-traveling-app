import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Calendar,
  MapPin,
  ArrowLeft,
  ShoppingCart,
  ArrowRight,
  Clock,
  Users,
  X,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../rtk/features/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [tripsArray, setTripsArray] = useState([]);
  const tripsFromRedux = useSelector((state) => state.cart.cart);

  const handleRemoveFromCart = (tripId) => {
    dispatch(removeFromCart(tripId));
    setTripsArray((prev) =>
      prev.filter((trip) => trip._id !== tripId && trip.id !== tripId)
    );
    toast.success("Item removed from cart");
  };

  const calculateTotal = () => {
    return tripsArray.reduce((total, trip) => {
      return total + (trip.price || 0);
    }, 0);
  };

  const handleCheckout = () => {
    // Navigate to checkout or booking page
    if (tripsArray.length > 0) {
      const firstTrip = tripsArray[0];
      navigate(`/booking/${firstTrip._id || firstTrip.id}/date/1`);
    }
  };

  useEffect(() => {
    if (!tripsFromRedux || tripsFromRedux.length === 0) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setTripsArray(localCart);
    } else {
      setTripsArray(tripsFromRedux);
    }
  }, [tripsFromRedux]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-soft-sand py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
            <div className="w-20 h-20 bg-natural-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-natural-blue" />
            </div>
            <h1 className="text-2xl font-bold text-deep-charcoal mb-4">
              Your Shopping Cart
            </h1>
            <p className="text-cool-gray mb-8 max-w-md mx-auto">
              Please sign in to view and manage your cart items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-6 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-colors shadow-soft"
              >
                Sign In
              </Link>
              <Link
                to="/trips"
                className="px-6 py-3 border border-natural-blue text-natural-blue rounded-xl hover:bg-natural-blue/5 transition-colors"
              >
                Browse Trips
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tripsArray.length === 0) {
    return (
      <div className="min-h-screen bg-soft-sand py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
            <div className="w-20 h-20 bg-natural-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-natural-blue" />
            </div>
            <h1 className="text-2xl font-bold text-deep-charcoal mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-cool-gray mb-8 max-w-md mx-auto">
              Add trips to your cart to continue with booking
            </p>
            <Link
              to="/trips"
              className="px-6 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-colors shadow-soft inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Browse Trips
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-sand py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-deep-charcoal">Your Cart</h1>
          <Link
            to="/trips"
            className="text-natural-blue hover:text-natural-blue-dark transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {tripsArray.map((trip) => (
              <div
                key={trip._id || trip.id}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={
                        trip.imageCover ||
                        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920"
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-cool-gray text-sm mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.destination || "Unknown Location"}</span>
                        </div>
                        <h3 className="text-xl font-bold text-deep-charcoal mb-2">
                          {trip.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-cool-gray mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{trip.duration || "N/A"} days</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Flexible dates</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>1 traveler</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveFromCart(trip._id || trip.id)
                        }
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove from cart"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(trip.ratingsAverage || 4.5)
                                  ? "text-warm-orange fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-cool-gray">
                          ({trip.ratingQuantity || 0} reviews)
                        </span>
                      </div>
                      <div className="text-xl font-bold text-natural-blue">
                        ${trip.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-8">
              <h2 className="text-xl font-bold text-deep-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {tripsArray.map((trip) => (
                  <div
                    key={trip._id || trip.id}
                    className="flex justify-between text-cool-gray"
                  >
                    <span className="truncate max-w-[200px]">{trip.title}</span>
                    <span>${trip.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-cool-gray mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-cool-gray mb-2">
                  <span>Taxes & Fees</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between font-bold text-deep-charcoal text-xl mt-4">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-warm-orange text-deep-charcoal rounded-xl hover:bg-warm-orange-dark transition-colors font-medium shadow-warm flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="mt-4 text-xs text-cool-gray text-center">
                By proceeding, you agree to our Terms of Service and Privacy
                Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
