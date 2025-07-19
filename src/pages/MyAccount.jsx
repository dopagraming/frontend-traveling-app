import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Star,
  Award,
  Camera,
  Edit3,
  Share2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Gift,
  Trophy,
  Heart,
  Settings,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [editingReview, setEditingReview] = useState(null);

  const user = useSelector((state) => state.user.user);
  console.log(user);

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      tripTitle: "Pyramids Discovery Tour",
      destination: "Giza, Egypt",
      date: "2024-03-15",
      status: "confirmed",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=300&h=200&fit=crop",
      bookingRef: "TRV001234",
      travelers: 2,
    },
    {
      id: 2,
      tripTitle: "Desert Adventure",
      destination: "Dubai, UAE",
      date: "2024-02-20",
      status: "completed",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=300&h=200&fit=crop",
      bookingRef: "TRV001235",
      travelers: 1,
    },
    {
      id: 3,
      tripTitle: "Tropical Paradise Retreat",
      destination: "Maldives",
      date: "2024-04-10",
      status: "pending",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      bookingRef: "TRV001236",
      travelers: 2,
    },
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      tripTitle: "Desert Adventure",
      rating: 5,
      comment:
        "Amazing experience! The guides were knowledgeable and the desert sunset was breathtaking. Highly recommended for adventure seekers.",
      date: "2024-02-25",
      helpful: 12,
      photos: [
        "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=200&h=150&fit=crop",
      ],
    },
    {
      id: 2,
      tripTitle: "City Walking Tour",
      rating: 4,
      comment:
        "Great tour with lots of historical insights. The guide was friendly and accommodating.",
      date: "2024-01-18",
      helpful: 8,
      photos: [],
    },
  ];

  // Mock shared trips data
  const sharedTrips = [
    {
      id: 1,
      title: "My Amazing Egypt Adventure",
      description:
        "Just returned from an incredible journey through ancient Egypt. The pyramids were even more magnificent in person!",
      photos: [
        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=200&h=150&fit=crop",
      ],
      likes: 24,
      comments: 8,
      date: "2024-02-28",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-natural-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-white/80 mb-2">{user?.email}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {user?.level}
                </span>
                <span>Member since {user?.memberSince}</span>
                <span>{user?.totalTrips} trips completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-8">
              {/* Points & Rewards */}
              <div className="text-center mb-6 p-4 bg-warm-orange/10 rounded-xl">
                <Trophy className="w-8 h-8 text-warm-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-deep-charcoal">
                  {user?.points}
                </div>
                <div className="text-sm text-cool-gray">Reward Points</div>
                <button className="mt-2 text-sm text-warm-orange hover:text-warm-orange-dark">
                  Redeem Points
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "bookings"
                      ? "bg-natural-blue text-white"
                      : "text-deep-charcoal hover:bg-natural-blue/10"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "reviews"
                      ? "bg-natural-blue text-white"
                      : "text-deep-charcoal hover:bg-natural-blue/10"
                  }`}
                >
                  <Star className="w-5 h-5" />
                  My Reviews
                </button>

                <button
                  onClick={() => setActiveTab("shared")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "shared"
                      ? "bg-natural-blue text-white"
                      : "text-deep-charcoal hover:bg-natural-blue/10"
                  }`}
                >
                  <Share2 className="w-5 h-5" />
                  Shared Trips
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "profile"
                      ? "bg-natural-blue text-white"
                      : "text-deep-charcoal hover:bg-natural-blue/10"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-deep-charcoal">
                    My Bookings
                  </h2>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 border border-natural-blue/30 rounded-lg">
                      <option>All Bookings</option>
                      <option>Upcoming</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl shadow-soft overflow-hidden"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={booking.image}
                          alt={booking.tripTitle}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-deep-charcoal mb-2">
                              {booking.tripTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-cool-gray mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.destination}</span>
                            </div>
                            <div className="flex items-center gap-2 text-cool-gray">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(booking.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-cool-gray">Booking Ref:</span>
                            <div className="font-medium">
                              {booking.bookingRef}
                            </div>
                          </div>
                          <div>
                            <span className="text-cool-gray">Travelers:</span>
                            <div className="font-medium">
                              {booking.travelers}
                            </div>
                          </div>
                          <div>
                            <span className="text-cool-gray">Total Paid:</span>
                            <div className="font-medium text-natural-blue">
                              ${booking.price}
                            </div>
                          </div>
                          <div>
                            <span className="text-cool-gray">Payment:</span>
                            <div className="font-medium text-green-600">
                              Completed
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-natural-blue text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors">
                            <Download className="w-4 h-4 inline mr-2" />
                            Download
                          </button>
                          {booking.status === "completed" && (
                            <button className="px-4 py-2 border border-warm-orange text-warm-orange rounded-lg hover:bg-warm-orange hover:text-deep-charcoal transition-colors">
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-deep-charcoal">
                    My Reviews
                  </h2>
                  <button className="px-4 py-2 bg-warm-orange text-deep-charcoal rounded-lg hover:bg-warm-orange-dark transition-colors">
                    Write New Review
                  </button>
                </div>

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl shadow-soft p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-deep-charcoal mb-2">
                          {review.tripTitle}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-warm-orange fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-cool-gray">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingReview(review.id)}
                        className="p-2 text-cool-gray hover:text-natural-blue transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-deep-charcoal mb-4">{review.comment}</p>

                    {review.photos.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Review photo ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-cool-gray">
                      <span>{review.helpful} people found this helpful</span>
                      <div className="flex gap-2">
                        <button className="text-natural-blue hover:text-natural-blue-dark">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Shared Trips Tab */}
            {activeTab === "shared" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-deep-charcoal">
                    Shared Trips
                  </h2>
                  <button className="px-4 py-2 bg-warm-orange text-deep-charcoal rounded-lg hover:bg-warm-orange-dark transition-colors">
                    <Camera className="w-4 h-4 inline mr-2" />
                    Share New Trip
                  </button>
                </div>

                {sharedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-2xl shadow-soft p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-deep-charcoal mb-2">
                          {trip.title}
                        </h3>
                        <p className="text-cool-gray mb-4">
                          {trip.description}
                        </p>
                      </div>
                      <span className="text-sm text-cool-gray">
                        {new Date(trip.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {trip.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Trip photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-cool-gray">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {trip.likes} likes
                        </span>
                        <span>{trip.comments} comments</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-natural-blue hover:text-natural-blue-dark transition-colors">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-cool-gray hover:text-natural-blue transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-deep-charcoal">
                  Profile Settings
                </h2>

                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h3 className="text-lg font-semibold text-deep-charcoal mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name}
                        className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
                      />
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-3 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors">
                    Save Changes
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h3 className="text-lg font-semibold text-deep-charcoal mb-4">
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-deep-charcoal">
                        Email Notifications
                      </span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-natural-blue rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-deep-charcoal">
                        SMS Notifications
                      </span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-natural-blue rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-deep-charcoal">
                        Marketing Communications
                      </span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-natural-blue rounded"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
