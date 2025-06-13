import React, { useState } from 'react';
import { 
  Star, 
  Play, 
  Filter, 
  MapPin, 
  Calendar, 
  User,
  Heart,
  Share2,
  ChevronDown,
  Quote
} from 'lucide-react';

const CustomerExperiences = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-15",
      tripType: "cultural",
      destination: "Egypt",
      title: "Absolutely Magical Experience",
      review: "The pyramids tour exceeded all my expectations. Our guide was incredibly knowledgeable and passionate about Egyptian history. The sunrise over the pyramids was a moment I'll never forget. Every detail was perfectly planned, from transportation to meals. Highly recommend this experience to anyone visiting Egypt!",
      images: [
        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=300&h=200&fit=crop"
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=300&h=200&fit=crop",
      hasVideo: true,
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-10",
      tripType: "adventure",
      destination: "Nepal",
      title: "Adventure of a Lifetime",
      review: "The Himalayan trekking experience was phenomenal. The guides were professional and safety-conscious while still making the journey exciting. The views were breathtaking, and the local hospitality was incredible. This trip pushed my limits and created memories that will last forever.",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=200&fit=crop"
      ],
      hasVideo: false,
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      date: "2024-01-08",
      tripType: "relaxation",
      destination: "Maldives",
      title: "Perfect Honeymoon Getaway",
      review: "Our honeymoon in the Maldives was absolutely perfect. The overwater villa was stunning, and the service was impeccable. The snorkeling was amazing, and the sunset dinners were romantic beyond words. A few minor issues with timing, but overall an incredible experience.",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=300&h=200&fit=crop",
      hasVideo: true,
      helpful: 31,
      verified: true
    },
    {
      id: 4,
      name: "James Wilson",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-05",
      tripType: "cultural",
      destination: "Japan",
      title: "Incredible Cultural Immersion",
      review: "The Japan cultural tour was expertly curated. From traditional tea ceremonies to modern Tokyo experiences, every moment was thoughtfully planned. Our local guides shared insights that you simply can't get from guidebooks. The cherry blossom season timing was perfect!",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=200&fit=crop"
      ],
      hasVideo: false,
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      name: "Lisa Thompson",
      location: "Sydney, Australia",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-03",
      tripType: "family",
      destination: "Costa Rica",
      title: "Amazing Family Adventure",
      review: "Traveling with kids can be challenging, but this Costa Rica family tour was perfectly organized. The wildlife encounters were incredible, and the kids loved every minute. The accommodations were family-friendly, and the activities were suitable for all ages. Highly recommended for families!",
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=200&fit=crop",
      hasVideo: true,
      helpful: 22,
      verified: true
    }
  ];

  const destinations = ['all', 'Egypt', 'Nepal', 'Maldives', 'Japan', 'Costa Rica'];
  const tripTypes = ['all', 'cultural', 'adventure', 'relaxation', 'family'];

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (activeFilter === 'all') return true;
    return testimonial.destination === activeFilter || testimonial.tripType === activeFilter;
  });

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const VideoTestimonial = ({ testimonial }) => (
    <div className="relative group cursor-pointer">
      <img
        src={testimonial.videoThumbnail}
        alt="Video testimonial"
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
        <div className="bg-white/90 rounded-full p-4">
          <Play className="w-8 h-8 text-natural-blue" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
        Video Review
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-natural-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Experiences</h1>
          <p className="text-xl opacity-90">Real stories from real travelers</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-natural-blue text-white rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Destination
                  </label>
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="px-4 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
                  >
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>
                        {dest === 'all' ? 'All Destinations' : dest}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Trip Type
                  </label>
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="px-4 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
                  >
                    {tripTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-deep-charcoal mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-natural-blue/30 rounded-lg focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-cool-gray">
            Showing {sortedTestimonials.length} of {testimonials.length} reviews
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-8">
          {sortedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-deep-charcoal">{testimonial.name}</h3>
                        {testimonial.verified && (
                          <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-cool-gray">
                        <MapPin className="w-4 h-4" />
                        <span>{testimonial.location}</span>
                        <span>•</span>
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-warm-orange fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-deep-charcoal">
                      {testimonial.rating}/5
                    </span>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-natural-blue/10 text-natural-blue rounded-full text-sm font-medium">
                    {testimonial.destination}
                  </span>
                  <span className="px-3 py-1 bg-warm-orange/10 text-warm-orange-dark rounded-full text-sm font-medium">
                    {testimonial.tripType.charAt(0).toUpperCase() + testimonial.tripType.slice(1)}
                  </span>
                </div>

                {/* Review Content */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-deep-charcoal mb-3">{testimonial.title}</h4>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-natural-blue/20" />
                    <p className="text-cool-gray leading-relaxed pl-6">{testimonial.review}</p>
                  </div>
                </div>

                {/* Media */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {testimonial.hasVideo && (
                      <VideoTestimonial testimonial={testimonial} />
                    )}
                    {testimonial.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Experience ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-natural-blue/20">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-cool-gray hover:text-natural-blue transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{testimonial.helpful} helpful</span>
                    </button>
                    <button className="flex items-center gap-2 text-cool-gray hover:text-natural-blue transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  
                  <button className="px-4 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors">
                    View Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
            Load More Reviews
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-natural-blue rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl opacity-90 mb-6">
            Help other travelers by sharing your amazing journey
          </p>
          <button className="px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerExperiences;