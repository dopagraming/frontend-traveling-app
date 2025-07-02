import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Clock,
  Star,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Save,
  Eye,
  Trash2,
  Edit,
  X,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreateTrip = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    duration: 1,
    price: "",
    maxGroupSize: 15,
    interests: [],
    accommodation: "",
    transportation: "",
    description: "",
    inclusions: [""],
    exclusions: [""],
    itinerary: [{ day: 1, title: "", description: "", activities: [""] }],
    images: [""],
    category: "",
    language: "English",
    difficulty: "easy",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to create trips");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data;
    },
  });

  // Fetch user's drafts
  const { data: drafts = [], refetch: refetchDrafts } = useQuery({
    queryKey: ["tripDrafts"],
    queryFn: async () => {
      const response = await api.get("/trips/drafts/my-drafts");
      return response.data.data;
    },
    enabled: isAuthenticated,
  });

  // Save draft mutation
  const saveDraftMutation = useMutation({
    mutationFn: async (draftData) => {
      const response = await api.post("/trips/drafts", draftData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Draft saved successfully!");
      refetchDrafts();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to save draft");
    },
  });

  // Generate AI suggestions mutation
  const generateSuggestionsMutation = useMutation({
    mutationFn: async (preferences) => {
      const response = await api.post("/trips/ai-suggestions", preferences);
      return response.data;
    },
    onSuccess: (data) => {
      setSuggestions(data.suggestions);
      setIsGenerating(false);
      setStep(3);
    },
    onError: (error) => {
      setIsGenerating(false);
      toast.error("Failed to generate suggestions");
    },
  });

  // Create trip mutation
  const createTripMutation = useMutation({
    mutationFn: async (tripData) => {
      const response = await api.post("/trips", tripData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Trip created successfully!");
      navigate("/trips");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create trip");
    },
  });

  const interests = [
    { id: "culture", label: "Culture & History", icon: "🏛️" },
    { id: "adventure", label: "Adventure Sports", icon: "🏔️" },
    { id: "food", label: "Food & Cuisine", icon: "🍜" },
    { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
    { id: "beach", label: "Beach & Relaxation", icon: "🏖️" },
    { id: "nightlife", label: "Nightlife & Entertainment", icon: "🎭" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "photography", label: "Photography", icon: "📸" },
  ];

  const accommodationTypes = [
    { id: "hotel", label: "Hotel", icon: <Hotel className="w-5 h-5" /> },
    { id: "resort", label: "Resort", icon: <Star className="w-5 h-5" /> },
    { id: "hostel", label: "Hostel", icon: <Users className="w-5 h-5" /> },
    {
      id: "apartment",
      label: "Apartment",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  const transportationTypes = [
    { id: "flight", label: "Flight", icon: <Plane className="w-5 h-5" /> },
    { id: "car", label: "Car Rental", icon: "🚗" },
    { id: "train", label: "Train", icon: "🚄" },
    { id: "bus", label: "Bus", icon: "🚌" },
  ];

  const handleInterestToggle = (interestId) => {
    setTripData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setTripData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setTripData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setTripData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const saveDraft = () => {
    saveDraftMutation.mutate(tripData);
  };

  const loadDraft = (draft) => {
    setTripData(draft);
    setShowDrafts(false);
    toast.success("Draft loaded successfully!");
  };

  const generateSuggestions = () => {
    setIsGenerating(true);
    generateSuggestionsMutation.mutate({
      destination: tripData.destination,
      interests: tripData.interests,
      duration: tripData.duration,
      budget: tripData.price,
      accommodation: tripData.accommodation,
      transportation: tripData.transportation,
    });
  };

  const createTrip = () => {
    if (!tripData.title || !tripData.destination || !tripData.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    createTripMutation.mutate(tripData);
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">
          Basic Trip Information
        </h2>
        <p className="text-cool-gray">Tell us about your trip idea</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Trip Title *
          </label>
          <input
            type="text"
            placeholder="Amazing Adventure in..."
            value={tripData.title}
            onChange={(e) =>
              setTripData({ ...tripData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Destination *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
            <input
              type="text"
              placeholder="Where will this trip take place?"
              value={tripData.destination}
              onChange={(e) =>
                setTripData({ ...tripData, destination: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Category
          </label>
          <select
            value={tripData.category}
            onChange={(e) =>
              setTripData({ ...tripData, category: e.target.value })
            }
            className="w-full px-4 py-3 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Duration (days)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setTripData({
                  ...tripData,
                  duration: Math.max(1, tripData.duration - 1),
                })
              }
              className="p-3 border border-natural-blue/30 rounded-xl hover:bg-natural-blue/10 transition-colors"
            >
              <Minus className="w-5 h-5 text-natural-blue" />
            </button>
            <span className="text-2xl font-bold text-deep-charcoal min-w-[3rem] text-center">
              {tripData.duration}
            </span>
            <button
              onClick={() =>
                setTripData({ ...tripData, duration: tripData.duration + 1 })
              }
              className="p-3 border border-natural-blue/30 rounded-xl hover:bg-natural-blue/10 transition-colors"
            >
              <Plus className="w-5 h-5 text-natural-blue" />
            </button>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Price per person *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
            <input
              type="number"
              placeholder="1000"
              value={tripData.price}
              onChange={(e) =>
                setTripData({ ...tripData, price: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe your trip..."
            value={tripData.description}
            onChange={(e) =>
              setTripData({ ...tripData, description: e.target.value })
            }
            className="w-full px-4 py-3 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">
          Trip Details
        </h2>
        <p className="text-cool-gray">Add more details about your trip</p>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">
          Trip Interests
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => handleInterestToggle(interest.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                tripData.interests.includes(interest.id)
                  ? "border-natural-blue bg-natural-blue/10 text-natural-blue"
                  : "border-natural-blue/30 hover:border-natural-blue/50"
              }`}
            >
              <div className="text-2xl mb-2">{interest.icon}</div>
              <div className="text-sm font-medium">{interest.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Accommodation */}
      <div>
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">
          Accommodation Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accommodationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() =>
                setTripData({ ...tripData, accommodation: type.id })
              }
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                tripData.accommodation === type.id
                  ? "border-natural-blue bg-natural-blue/10 text-natural-blue"
                  : "border-natural-blue/30 hover:border-natural-blue/50"
              }`}
            >
              <div className="mb-2">{type.icon}</div>
              <div className="text-sm font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div>
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">
          Transportation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {transportationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() =>
                setTripData({ ...tripData, transportation: type.id })
              }
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                tripData.transportation === type.id
                  ? "border-natural-blue bg-natural-blue/10 text-natural-blue"
                  : "border-natural-blue/30 hover:border-natural-blue/50"
              }`}
            >
              <div className="mb-2 text-2xl">
                {typeof type.icon === "string" ? type.icon : type.icon}
              </div>
              <div className="text-sm font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Inclusions */}
      <div>
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">
          What's Included
        </h3>
        {tripData.inclusions.map((inclusion, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="e.g., Accommodation, Meals, Guide"
              value={inclusion}
              onChange={(e) =>
                updateArrayItem("inclusions", index, e.target.value)
              }
              className="flex-1 px-4 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue"
            />
            <button
              onClick={() => removeArrayItem("inclusions", index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("inclusions")}
          className="flex items-center gap-2 text-natural-blue hover:text-natural-blue-dark"
        >
          <Plus className="w-4 h-4" />
          Add Inclusion
        </button>
      </div>
    </div>
  );

  const renderGenerating = () => (
    <div className="text-center py-16">
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-natural-blue/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-natural-blue animate-pulse" />
        </div>
        <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-natural-blue/30 rounded-full animate-spin border-t-natural-blue"></div>
      </div>
      <h2 className="text-2xl font-bold text-deep-charcoal mb-4">
        Generating AI Suggestions
      </h2>
      <p className="text-cool-gray mb-8">
        Our AI is analyzing your preferences and creating personalized
        recommendations...
      </p>
      <div className="max-w-md mx-auto bg-natural-blue/10 rounded-full h-2">
        <div
          className="bg-natural-blue h-2 rounded-full animate-pulse"
          style={{ width: "70%" }}
        ></div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">
          AI-Generated Suggestions
        </h2>
        <p className="text-cool-gray">
          Based on your preferences, here are our recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-deep-charcoal">
                  {suggestion.title}
                </h3>
                <div className="flex items-center gap-1 text-natural-blue">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {suggestion.duration}
                  </span>
                </div>
              </div>

              <p className="text-cool-gray mb-4">{suggestion.description}</p>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-deep-charcoal">
                  Highlights:
                </h4>
                <ul className="space-y-1">
                  {suggestion.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-cool-gray"
                    >
                      <div className="w-1.5 h-1.5 bg-natural-blue rounded-full"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm text-cool-gray">Estimated Cost</span>
                  <div className="text-2xl font-bold text-natural-blue">
                    {suggestion.estimatedCost}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-warm-orange">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">AI Match: 95%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setTripData((prev) => ({
                      ...prev,
                      title: suggestion.title,
                      description: suggestion.description,
                      price: suggestion.estimatedCost.replace("$", ""),
                      type: suggestion.type,
                    }));
                    setStep(4);
                  }}
                  className="flex-1 bg-natural-blue text-white py-3 rounded-xl hover:bg-natural-blue-dark transition-colors font-medium"
                >
                  Use This Suggestion
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setStep(4)}
          className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1"
        >
          Continue Without Suggestions
        </button>
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">
          Review & Create
        </h2>
        <p className="text-cool-gray">
          Review your trip details and create your trip
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-deep-charcoal mb-4">
          Trip Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-deep-charcoal mb-2">
              Basic Information
            </h4>
            <ul className="space-y-2 text-cool-gray">
              <li>
                <strong>Title:</strong> {tripData.title}
              </li>
              <li>
                <strong>Destination:</strong> {tripData.destination}
              </li>
              <li>
                <strong>Duration:</strong> {tripData.duration} days
              </li>
              <li>
                <strong>Price:</strong> ${tripData.price} per person
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-deep-charcoal mb-2">
              Preferences
            </h4>
            <ul className="space-y-2 text-cool-gray">
              <li>
                <strong>Interests:</strong>{" "}
                {tripData.interests.join(", ") || "None selected"}
              </li>
              <li>
                <strong>Accommodation:</strong>{" "}
                {tripData.accommodation || "Not specified"}
              </li>
              <li>
                <strong>Transportation:</strong>{" "}
                {tripData.transportation || "Not specified"}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={saveDraft}
          disabled={saveDraftMutation.isLoading}
          className="flex items-center gap-2 px-6 py-3 border border-natural-blue text-natural-blue rounded-xl hover:bg-natural-blue hover:text-white transition-colors"
        >
          <Save className="w-5 h-5" />
          {saveDraftMutation.isLoading ? "Saving..." : "Save as Draft"}
        </button>

        <button
          onClick={createTrip}
          disabled={createTripMutation.isLoading}
          className="flex-1 bg-warm-orange text-deep-charcoal py-3 rounded-xl hover:bg-warm-orange-dark transition-colors font-medium"
        >
          {createTripMutation.isLoading ? "Creating..." : "Create Trip"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-natural-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Create Your Perfect Trip
              </h1>
              <p className="text-xl opacity-90">
                Design and share your travel experiences
              </p>
            </div>

            {/* Drafts Button */}
            <button
              onClick={() => setShowDrafts(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Edit className="w-5 h-5" />
              My Drafts ({drafts.length})
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-deep-charcoal">
              Step {step} of 4
            </span>
            <span className="text-sm text-cool-gray">
              {Math.round((step / 4) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-natural-blue/20 rounded-full h-2">
            <div
              className="bg-natural-blue h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && !isGenerating && renderSuggestions()}
            {step === 4 && renderFinalStep()}
            {isGenerating && renderGenerating()}
          </div>

          {/* Navigation */}
          {!isGenerating && (
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-natural-blue text-natural-blue rounded-xl hover:bg-natural-blue hover:text-white transition-colors"
                >
                  Previous
                </button>
              )}

              {step < 4 && (
                <button
                  onClick={() => {
                    if (step === 2) {
                      generateSuggestions();
                    } else {
                      setStep(step + 1);
                    }
                  }}
                  className="ml-auto flex items-center gap-2 px-6 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-colors"
                >
                  {step === 2 ? "Generate AI Suggestions" : "Continue"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drafts Modal */}
      {showDrafts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-natural-blue/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-deep-charcoal">
                  My Drafts
                </h2>
                <button
                  onClick={() => setShowDrafts(false)}
                  className="p-2 hover:bg-cool-gray/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {drafts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-cool-gray">
                    No drafts found. Start creating your first trip!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drafts.map((draft) => (
                    <div
                      key={draft._id}
                      className="border border-natural-blue/20 rounded-lg p-4"
                    >
                      <h3 className="font-bold text-deep-charcoal mb-2">
                        {draft.title || "Untitled Draft"}
                      </h3>
                      <p className="text-cool-gray text-sm mb-3">
                        {draft.destination}
                      </p>
                      <p className="text-xs text-cool-gray mb-4">
                        Last updated:{" "}
                        {new Date(draft.updatedAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadDraft(draft)}
                          className="flex-1 bg-natural-blue text-white py-2 rounded-lg hover:bg-natural-blue-dark transition-colors"
                        >
                          Load Draft
                        </button>
                        <button className="px-3 py-2 text-natural-blue hover:bg-natural-blue/10 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
