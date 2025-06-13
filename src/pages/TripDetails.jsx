import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  Share2, 
  Calendar, 
  Users, 
  CheckCircle,
  ArrowLeft,
  Play,
  Camera,
  Award,
  Shield,
  Wifi,
  Coffee
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "../lib/axios";
import { addToWishlist } from "../rtk/features/wishlistSlice";
import { addToCart } from "../rtk/features/cartSlice";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [spotsRequested, setSpotsRequested] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data.data);
      } catch (error) {
        console.error('Error fetching trip:', error);
        toast.error('Failed to load trip details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchTrip();
    }
  }, [id]);

  const handleAvailabilityCheck = async () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    try {
      setCheckingAvailability(true);
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
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book this trip');
      navigate('/login');
      return;
    }

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

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      navigate('/login');
      return;
    }
    dispatch(addToWishlist(trip));
    toast.success("Trip added to your wishlist");
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart(trip));
    toast.success("Trip added to your cart");
  };

  const shareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: trip?.title,
        text: trip?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft text-center">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Trip Not Found</h2>
          <p className="text-cool-gray mb-6">The trip you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/trips')}
            className="px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors"
          >
            Browse All Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-natural-blue hover:text-natural-blue-dark transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Trips
          </button>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-cool-gray text-sm mb-2">
                <MapPin className="h-4 w-4" />
                <span>{trip.destination}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-4">
                {trip.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-cool-gray">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warm-orange fill-current" />
                  <span className="font-medium">{trip.ratingsAverage}</span>
                  <span>({trip.ratingQuantity} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{trip.duration} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Small group</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToWishlist}
                className="p-3 bg-soft-sand hover:bg-natural-blue/10 rounded-full transition-colors"
              >
                <Heart className="h-5 w-5 text-natural-blue" />
              </button>
              <button
                onClick={shareTrip}
                className="p-3 bg-soft-sand hover:bg-natural-blue/10 rounded-full transition-colors"
              >
                <Share2 className="h-5 w-5 text-natural-blue" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-4 mb-8">
          <div className="col-span-12 lg:col-span-8 relative h-96 lg:h-[500px] overflow-hidden rounded-xl">
            <img
              src={trip.imageCover}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            {trip.video && (
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                <div className="bg-white/90 rounded-full p-4">
                  <Play className="w-8 h-8 text-natural-blue" />
                </div>
              </button>
            )}
          </div>
          
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
            {trip.images?.slice(0, 4).map((image, index) => (
              <div key={index} className="relative h-44 lg:h-[240px] overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`${trip.title} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {index === 3 && trip.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">+{trip.images.length - 4} more</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 shadow-soft">
              {['overview', 'itinerary', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-natural-blue text-white'
                      : 'text-cool-gray hover:text-natural-blue'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-deep-charcoal mb-4">About this trip</h2>
                    <p className="text-cool-gray leading-relaxed mb-6">
                      {trip.description}
                    </p>
                  </div>

                  {/* Trip Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-soft-sand rounded-lg">
                      <Clock className="h-6 w-6 text-natural-blue" />
                      <div>
                        <h3 className="font-semibold text-deep-charcoal">Duration</h3>
                        <p className="text-cool-gray">{trip.duration} days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-soft-sand rounded-lg">
                      <Users className="h-6 w-6 text-natural-blue" />
                      <div>
                        <h3 className="font-semibold text-deep-charcoal">Group Size</h3>
                        <p className="text-cool-gray">Small group (max 15)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-soft-sand rounded-lg">
                      <Award className="h-6 w-6 text-natural-blue" />
                      <div>
                        <h3 className="font-semibold text-deep-charcoal">Guide</h3>
                        <p className="text-cool-gray">{trip.tripLanguage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-soft-sand rounded-lg">
                      <Shield className="h-6 w-6 text-natural-blue" />
                      <div>
                        <h3 className="font-semibold text-deep-charcoal">Safety</h3>
                        <p className="text-cool-gray">Fully insured</p>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions & Exclusions */}
                  {(trip.inclusions?.length > 0 || trip.exclusions?.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trip.inclusions?.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-deep-charcoal mb-3">What's Included</h3>
                          <ul className="space-y-2">
                            {trip.inclusions.map((item, index) => (
                              <li key={index} className="flex items-center gap-2 text-cool-gray">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {trip.exclusions?.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-deep-charcoal mb-3">What's Not Included</h3>
                          <ul className="space-y-2">
                            {trip.exclusions.map((item, index) => (
                              <li key={index} className="flex items-center gap-2 text-cool-gray">
                                <span className="w-4 h-4 border border-red-300 rounded-full flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-6">Trip Itinerary</h2>
                  {trip.itinerary?.length > 0 ? (
                    <div className="space-y-6">
                      {trip.itinerary.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-natural-blue text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-deep-charcoal mb-2">
                              Day {item.day || index + 1}
                            </h3>
                            <p className="text-cool-gray">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : trip.tripRoute?.length > 0 ? (
                    <div className="space-y-6">
                      {trip.tripRoute.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-natural-blue/10 rounded-full flex items-center justify-center text-xl">
                              {item.icon || '📍'}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-deep-charcoal mb-1">
                              {item.location}
                            </h3>
                            {item.duration && (
                              <p className="text-sm text-natural-blue mb-2">{item.duration}</p>
                            )}
                            {item.activity && (
                              <p className="text-cool-gray">{item.activity}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-cool-gray">Detailed itinerary will be provided upon booking.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-6">
                    Reviews ({trip.ratingQuantity})
                  </h2>
                  {trip.reviews?.length > 0 ? (
                    <div className="space-y-6">
                      {trip.reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-natural-blue text-white rounded-full flex items-center justify-center font-bold">
                              {review.user?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-deep-charcoal">{review.user}</h4>
                                {review.country && (
                                  <span className="text-sm text-cool-gray">from {review.country}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'text-warm-orange fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-cool-gray">
                                  {format(new Date(review.date), "MMM d, yyyy")}
                                </span>
                              </div>
                              <p className="text-cool-gray">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-cool-gray">No reviews yet. Be the first to review this trip!</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-3xl font-bold text-natural-blue">${trip.price}</span>
                  <span className="text-cool-gray ml-2">per person</span>
                </div>
                {trip.priceDiscount && (
                  <div className="text-right">
                    <span className="text-lg text-cool-gray line-through">${trip.priceDiscount}</span>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${trip.priceDiscount - trip.price}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue h-5 w-5" />
                    <select
                      value={spotsRequested}
                      onChange={(e) => setSpotsRequested(Number(e.target.value))}
                      className="pl-10 block w-full rounded-lg border-natural-blue/30 focus:ring-natural-blue focus:border-natural-blue bg-soft-sand text-deep-charcoal"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue h-5 w-5" />
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="pl-10 block w-full rounded-lg border-natural-blue/30 focus:ring-natural-blue focus:border-natural-blue bg-soft-sand text-deep-charcoal"
                    >
                      <option value="">Choose a date</option>
                      {trip.availability?.map((date) => (
                        <option key={date._id} value={date._id}>
                          {format(new Date(date.date), "MMM d, yyyy")} 
                          ({date.availableSpots} spots left)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAvailabilityCheck}
                  disabled={!selectedDate || checkingAvailability}
                  className="w-full py-3 bg-natural-blue/10 text-natural-blue rounded-lg hover:bg-natural-blue/20 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkingAvailability ? 'Checking...' : 'Check Availability'}
                </button>
              </div>

              {isAvailable && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Available!</span>
                  </div>
                  <div className="space-y-2 text-sm text-green-600">
                    <div className="flex justify-between">
                      <span>Price ({spotsRequested} {spotsRequested === 1 ? 'person' : 'people'})</span>
                      <span>${trip.price * spotsRequested}</span>
                    </div>
                    <div className="flex justify-between font-bold text-green-700 pt-2 border-t border-green-200">
                      <span>Total</span>
                      <span>${trip.price * spotsRequested}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleBooking}
                  disabled={!isAvailable}
                  className="w-full py-3 bg-warm-orange text-deep-charcoal rounded-lg hover:bg-warm-orange-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-warm hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isAvailable ? 'Book Now' : 'Check Availability First'}
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 border border-natural-blue text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-cool-gray mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Free cancellation up to 24 hours before</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cool-gray">
                  <CheckCircle className="h-4 w-4" />
                  <span>Instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;