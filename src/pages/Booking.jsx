import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  CreditCard, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  Star,
  Phone,
  Mail,
  User
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import api from "../lib/axios";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  paymentMethod: z.enum(["credit_card", "usdt"], {
    required_error: "Please select a payment method",
  }),
  notes: z.string().optional(),
});

const Booking = () => {
  const { tripId, dateId, spots } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [trip, setTrip] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to continue with booking');
      navigate('/login');
      return;
    }

    const fetchTripData = async () => {
      try {
        setLoading(true);
        const response = await api.post(`/trips/checkavailability`, {
          tripId: tripId,
          availabilityId: dateId,
          spotsRequested: parseInt(spots),
        });

        if (response.data.availability) {
          setTrip(response.data.trip);
          setSelectedDate(response.data.selectedDate);
        } else {
          toast.error('This trip is no longer available for the selected date');
          navigate(`/trips/${tripId}`);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
        toast.error('Failed to load booking information');
        navigate(`/trips/${tripId}`);
      } finally {
        setLoading(false);
      }
    };

    if (tripId && dateId && spots) {
      fetchTripData();
    }
  }, [tripId, dateId, spots, isAuthenticated, navigate]);

  // Pre-fill form with user data when available
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(' ') || [];
      setValue('firstName', nameParts[0] || '');
      setValue('lastName', nameParts.slice(1).join(' ') || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await api.post(`/order/checkout-session/${tripId}`, {
        tripId,
        dateId,
        spots: parseInt(spots),
        data,
      });

      if (response.data.session?.url) {
        window.location.href = response.data.session.url;
      } else {
        toast.error('Failed to create payment session');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to process booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">Loading booking information...</p>
        </div>
      </div>
    );
  }

  if (!trip || !selectedDate) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft text-center">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Booking Not Available</h2>
          <p className="text-cool-gray mb-6">The selected trip or date is no longer available.</p>
          <button
            onClick={() => navigate('/trips')}
            className="px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
          >
            Browse Other Trips
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = trip.price * parseInt(spots);

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(`/trips/${tripId}`)}
            className="flex items-center gap-2 text-natural-blue hover:text-natural-blue-dark transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Trip Details
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-deep-charcoal">
            Complete Your Booking
          </h1>
          <p className="text-cool-gray mt-2">
            You're just one step away from your amazing adventure!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Traveler Information */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-xl font-bold text-deep-charcoal mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-natural-blue" />
                  Traveler Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-deep-charcoal mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-charcoal mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-charcoal mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue h-5 w-5" />
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full pl-10 pr-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand"
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-charcoal mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue h-5 w-5" />
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full pl-10 pr-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand"
                        placeholder="+1234567890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand"
                    placeholder="Any special requests or dietary requirements..."
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-xl font-bold text-deep-charcoal mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-natural-blue" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-natural-blue/30 rounded-lg cursor-pointer hover:bg-soft-sand transition-colors">
                    <input
                      type="radio"
                      value="credit_card"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-natural-blue focus:ring-natural-blue"
                    />
                    <div className="ml-3 flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-natural-blue" />
                      <div>
                        <div className="font-medium text-deep-charcoal">Credit/Debit Card</div>
                        <div className="text-sm text-cool-gray">Secure payment via Stripe</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-natural-blue/30 rounded-lg cursor-pointer hover:bg-soft-sand transition-colors">
                    <input
                      type="radio"
                      value="usdt"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-natural-blue focus:ring-natural-blue"
                    />
                    <div className="ml-3 flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        $
                      </div>
                      <div>
                        <div className="font-medium text-deep-charcoal">USDT (Cryptocurrency)</div>
                        <div className="text-sm text-cool-gray">Pay with USDT</div>
                      </div>
                    </div>
                  </label>
                </div>

                {errors.paymentMethod && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              {/* Terms and Submit */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-start gap-3 mb-6">
                  <Shield className="h-5 w-5 text-natural-blue flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-cool-gray">
                    <p className="mb-2">
                      By proceeding with this booking, you agree to our{" "}
                      <a href="/terms" className="text-natural-blue hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-natural-blue hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <p>
                      Your payment information is secure and encrypted. We use industry-standard
                      security measures to protect your data.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-warm-orange text-deep-charcoal rounded-lg hover:bg-warm-orange-dark transition-colors font-semibold text-lg shadow-warm hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-deep-charcoal"></div>
                      Processing...
                    </div>
                  ) : (
                    `Complete Booking - $${totalPrice}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-8">
              <h2 className="text-xl font-bold text-deep-charcoal mb-6">Booking Summary</h2>

              {/* Trip Image and Title */}
              <div className="mb-6">
                <img
                  src={trip.imageCover}
                  alt={trip.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-deep-charcoal mb-2">{trip.title}</h3>
                <div className="flex items-center gap-1 text-sm text-cool-gray">
                  <Star className="w-4 h-4 text-warm-orange fill-current" />
                  <span>{trip.ratingsAverage}</span>
                  <span>({trip.ratingQuantity} reviews)</span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-natural-blue" />
                  <span className="text-cool-gray">{trip.destination}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-natural-blue" />
                  <span className="text-cool-gray">
                    {format(new Date(selectedDate.date), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-natural-blue" />
                  <span className="text-cool-gray">{trip.duration} days</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-natural-blue" />
                  <span className="text-cool-gray">
                    {spots} {parseInt(spots) === 1 ? 'traveler' : 'travelers'}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-cool-gray">
                    ${trip.price} × {spots} {parseInt(spots) === 1 ? 'person' : 'people'}
                  </span>
                  <span className="text-deep-charcoal">${totalPrice}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-cool-gray">Service fee</span>
                  <span className="text-deep-charcoal">$0</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-cool-gray">Taxes</span>
                  <span className="text-deep-charcoal">Included</span>
                </div>
                
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-deep-charcoal">Total</span>
                    <span className="text-natural-blue">${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-soft-sand rounded-lg">
                <div className="flex items-center gap-2 text-sm text-natural-blue mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Secure Booking</span>
                </div>
                <ul className="text-xs text-cool-gray space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Free cancellation up to 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Instant confirmation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Secure payment processing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;