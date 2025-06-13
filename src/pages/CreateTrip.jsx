import React, { useState } from 'react';
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
  Utensils
} from 'lucide-react';

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: 1,
    interests: [],
    accommodation: '',
    transportation: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
    { id: 'food', label: 'Food & Cuisine', icon: '🍜' },
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { id: 'beach', label: 'Beach & Relaxation', icon: '🏖️' },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: '🎭' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'photography', label: 'Photography', icon: '📸' }
  ];

  const accommodationTypes = [
    { id: 'hotel', label: 'Hotel', icon: <Hotel className="w-5 h-5" /> },
    { id: 'resort', label: 'Resort', icon: <Star className="w-5 h-5" /> },
    { id: 'hostel', label: 'Hostel', icon: <Users className="w-5 h-5" /> },
    { id: 'apartment', label: 'Apartment', icon: <MapPin className="w-5 h-5" /> }
  ];

  const transportationTypes = [
    { id: 'flight', label: 'Flight', icon: <Plane className="w-5 h-5" /> },
    { id: 'car', label: 'Car Rental', icon: '🚗' },
    { id: 'train', label: 'Train', icon: '🚄' },
    { id: 'bus', label: 'Bus', icon: '🚌' }
  ];

  const handleInterestToggle = (interestId) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSuggestions = [
        {
          id: 1,
          title: "Cultural Heritage Tour",
          duration: "5 days",
          highlights: ["Ancient Temples", "Local Museums", "Traditional Markets"],
          estimatedCost: "$450",
          description: "Immerse yourself in rich cultural heritage with guided tours of historical sites."
        },
        {
          id: 2,
          title: "Adventure Explorer Package",
          duration: "7 days",
          highlights: ["Mountain Hiking", "River Rafting", "Rock Climbing"],
          estimatedCost: "$680",
          description: "Perfect for thrill-seekers looking for adrenaline-pumping activities."
        },
        {
          id: 3,
          title: "Relaxation Retreat",
          duration: "4 days",
          highlights: ["Spa Treatments", "Beach Time", "Sunset Cruises"],
          estimatedCost: "$320",
          description: "Unwind and rejuvenate with peaceful activities and scenic views."
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">Where would you like to go?</h2>
        <p className="text-cool-gray">Tell us about your dream destination and travel preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={tripData.destination}
              onChange={(e) => setTripData({...tripData, destination: e.target.value})}
              className="w-full pl-10 pr-4 py-4 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 text-lg"
            />
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
            <input
              type="date"
              value={tripData.startDate}
              onChange={(e) => setTripData({...tripData, startDate: e.target.value})}
              className="w-full pl-10 pr-4 py-4 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
            <input
              type="date"
              value={tripData.endDate}
              onChange={(e) => setTripData({...tripData, endDate: e.target.value})}
              className="w-full pl-10 pr-4 py-4 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Budget (per person)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
            <input
              type="number"
              placeholder="1000"
              value={tripData.budget}
              onChange={(e) => setTripData({...tripData, budget: e.target.value})}
              className="w-full pl-10 pr-4 py-4 border border-natural-blue/30 rounded-xl focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
            />
          </div>
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-medium text-deep-charcoal mb-2">
            Number of Travelers
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTripData({...tripData, travelers: Math.max(1, tripData.travelers - 1)})}
              className="p-3 border border-natural-blue/30 rounded-xl hover:bg-natural-blue/10 transition-colors"
            >
              <Minus className="w-5 h-5 text-natural-blue" />
            </button>
            <span className="text-2xl font-bold text-deep-charcoal min-w-[3rem] text-center">
              {tripData.travelers}
            </span>
            <button
              onClick={() => setTripData({...tripData, travelers: tripData.travelers + 1})}
              className="p-3 border border-natural-blue/30 rounded-xl hover:bg-natural-blue/10 transition-colors"
            >
              <Plus className="w-5 h-5 text-natural-blue" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">What interests you?</h2>
        <p className="text-cool-gray">Select your preferences to get personalized recommendations</p>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">Travel Interests</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => handleInterestToggle(interest.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                tripData.interests.includes(interest.id)
                  ? 'border-natural-blue bg-natural-blue/10 text-natural-blue'
                  : 'border-natural-blue/30 hover:border-natural-blue/50'
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
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">Accommodation Preference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accommodationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setTripData({...tripData, accommodation: type.id})}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                tripData.accommodation === type.id
                  ? 'border-natural-blue bg-natural-blue/10 text-natural-blue'
                  : 'border-natural-blue/30 hover:border-natural-blue/50'
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
        <h3 className="text-lg font-semibold text-deep-charcoal mb-4">Transportation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {transportationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setTripData({...tripData, transportation: type.id})}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                tripData.transportation === type.id
                  ? 'border-natural-blue bg-natural-blue/10 text-natural-blue'
                  : 'border-natural-blue/30 hover:border-natural-blue/50'
              }`}
            >
              <div className="mb-2 text-2xl">{typeof type.icon === 'string' ? type.icon : type.icon}</div>
              <div className="text-sm font-medium">{type.label}</div>
            </button>
          ))}
        </div>
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
      <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Creating Your Perfect Trip</h2>
      <p className="text-cool-gray mb-8">Our AI is analyzing your preferences and crafting personalized recommendations...</p>
      <div className="max-w-md mx-auto bg-natural-blue/10 rounded-full h-2">
        <div className="bg-natural-blue h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-charcoal mb-4">Your Personalized Trip Options</h2>
        <p className="text-cool-gray">Based on your preferences, here are our AI-powered recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-deep-charcoal">{suggestion.title}</h3>
                <div className="flex items-center gap-1 text-natural-blue">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{suggestion.duration}</span>
                </div>
              </div>

              <p className="text-cool-gray mb-4">{suggestion.description}</p>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-deep-charcoal">Highlights:</h4>
                <ul className="space-y-1">
                  {suggestion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-cool-gray">
                      <div className="w-1.5 h-1.5 bg-natural-blue rounded-full"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm text-cool-gray">Estimated Cost</span>
                  <div className="text-2xl font-bold text-natural-blue">{suggestion.estimatedCost}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-warm-orange">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">AI Match: 95%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-natural-blue text-white py-3 rounded-xl hover:bg-natural-blue-dark transition-colors font-medium">
                  Select This Trip
                </button>
                <button className="px-4 py-3 border border-natural-blue text-natural-blue rounded-xl hover:bg-natural-blue hover:text-white transition-colors">
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
          Generate More Options
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-natural-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Perfect Trip</h1>
          <p className="text-xl opacity-90">Let our AI help you plan an unforgettable adventure</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-deep-charcoal">Step {step} of 3</span>
            <span className="text-sm text-cool-gray">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-natural-blue/20 rounded-full h-2">
            <div 
              className="bg-natural-blue h-2 rounded-full transition-all duration-500"
              style={{width: `${(step / 3) * 100}%`}}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && !isGenerating && renderSuggestions()}
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
              
              {step < 3 && (
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
                  {step === 2 ? 'Generate Trip Ideas' : 'Continue'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;