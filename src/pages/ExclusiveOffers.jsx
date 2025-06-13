import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Zap, 
  Gift,
  Tag,
  Clock,
  Percent,
  Heart,
  Share2,
  ChevronRight
} from 'lucide-react';

const ExclusiveOffers = () => {
  const [timeLeft, setTimeLeft] = useState({});

  const offers = [
    {
      id: 1,
      title: "Early Bird Special: Egypt Explorer",
      destination: "Cairo & Luxor, Egypt",
      originalPrice: 1299,
      discountPrice: 899,
      discount: 31,
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=500&h=300&fit=crop",
      endDate: "2024-02-15T23:59:59",
      type: "flash",
      badge: "Flash Sale",
      badgeColor: "bg-red-500",
      description: "Discover ancient wonders with our comprehensive Egypt tour including pyramids, temples, and Nile cruise.",
      highlights: ["Pyramid Tours", "Nile Cruise", "Expert Guide", "All Meals"],
      rating: 4.9,
      reviews: 234,
      duration: "8 days",
      groupSize: "12-16 people",
      savings: 400,
      bookingDeadline: "Limited to first 50 bookings"
    },
    {
      id: 2,
      title: "Summer Adventure: Himalayan Trek",
      destination: "Nepal",
      originalPrice: 1899,
      discountPrice: 1399,
      discount: 26,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      endDate: "2024-02-20T23:59:59",
      type: "seasonal",
      badge: "Summer Special",
      badgeColor: "bg-orange-500",
      description: "Epic Himalayan adventure with breathtaking mountain views and cultural immersion.",
      highlights: ["Mountain Trekking", "Local Villages", "Sherpa Guides", "Equipment Included"],
      rating: 4.8,
      reviews: 156,
      duration: "14 days",
      groupSize: "8-12 people",
      savings: 500,
      bookingDeadline: "Book by March 1st"
    },
    {
      id: 3,
      title: "Luxury Escape: Maldives Paradise",
      destination: "Maldives",
      originalPrice: 2499,
      discountPrice: 1799,
      discount: 28,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      endDate: "2024-02-25T23:59:59",
      type: "luxury",
      badge: "Luxury Deal",
      badgeColor: "bg-purple-500",
      description: "Ultimate luxury experience in overwater villas with world-class amenities.",
      highlights: ["Overwater Villa", "Private Butler", "Spa Treatments", "Fine Dining"],
      rating: 4.9,
      reviews: 89,
      duration: "7 days",
      groupSize: "2-4 people",
      savings: 700,
      bookingDeadline: "Honeymoon special"
    },
    {
      id: 4,
      title: "Cultural Journey: Japan Discovery",
      destination: "Tokyo & Kyoto, Japan",
      originalPrice: 1699,
      discountPrice: 1299,
      discount: 24,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=300&fit=crop",
      endDate: "2024-03-01T23:59:59",
      type: "cultural",
      badge: "Cultural Special",
      badgeColor: "bg-blue-500",
      description: "Immerse yourself in Japanese culture with traditional experiences and modern marvels.",
      highlights: ["Tea Ceremony", "Temple Visits", "Bullet Train", "Local Cuisine"],
      rating: 4.7,
      reviews: 198,
      duration: "10 days",
      groupSize: "10-15 people",
      savings: 400,
      bookingDeadline: "Cherry blossom season"
    },
    {
      id: 5,
      title: "Family Fun: Costa Rica Adventure",
      destination: "Costa Rica",
      originalPrice: 1199,
      discountPrice: 899,
      discount: 25,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
      endDate: "2024-02-28T23:59:59",
      type: "family",
      badge: "Family Deal",
      badgeColor: "bg-green-500",
      description: "Perfect family adventure with wildlife encounters and exciting activities for all ages.",
      highlights: ["Wildlife Tours", "Zip Lining", "Beach Time", "Kid-Friendly"],
      rating: 4.8,
      reviews: 167,
      duration: "9 days",
      groupSize: "6-20 people",
      savings: 300,
      bookingDeadline: "Family package special"
    },
    {
      id: 6,
      title: "Weekend Getaway: Dubai Deluxe",
      destination: "Dubai, UAE",
      originalPrice: 799,
      discountPrice: 599,
      discount: 25,
      image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=500&h=300&fit=crop",
      endDate: "2024-02-18T23:59:59",
      type: "weekend",
      badge: "Weekend Special",
      badgeColor: "bg-yellow-500",
      description: "Quick luxury escape to Dubai with desert adventures and city experiences.",
      highlights: ["Desert Safari", "Burj Khalifa", "Luxury Hotel", "Shopping"],
      rating: 4.6,
      reviews: 143,
      duration: "4 days",
      groupSize: "8-12 people",
      savings: 200,
      bookingDeadline: "Perfect for long weekends"
    }
  ];

  // Calculate time remaining for each offer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const newTimeLeft = {};

      offers.forEach(offer => {
        const endTime = new Date(offer.endDate).getTime();
        const difference = endTime - now;

        if (difference > 0) {
          newTimeLeft[offer.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        } else {
          newTimeLeft[offer.id] = { expired: true };
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownTimer = ({ offerId }) => {
    const time = timeLeft[offerId];
    
    if (!time || time.expired) {
      return (
        <div className="text-red-600 font-semibold">
          Offer Expired
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Timer className="w-4 h-4 text-red-600" />
        <div className="flex gap-1 text-sm font-mono">
          <span className="bg-red-600 text-white px-2 py-1 rounded">{time.days.toString().padStart(2, '0')}</span>
          <span className="text-red-600">:</span>
          <span className="bg-red-600 text-white px-2 py-1 rounded">{time.hours.toString().padStart(2, '0')}</span>
          <span className="text-red-600">:</span>
          <span className="bg-red-600 text-white px-2 py-1 rounded">{time.minutes.toString().padStart(2, '0')}</span>
          <span className="text-red-600">:</span>
          <span className="bg-red-600 text-white px-2 py-1 rounded">{time.seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>
    );
  };

  const getOfferTypeIcon = (type) => {
    switch (type) {
      case 'flash': return <Zap className="w-5 h-5" />;
      case 'luxury': return <Star className="w-5 h-5" />;
      case 'family': return <Users className="w-5 h-5" />;
      case 'weekend': return <Clock className="w-5 h-5" />;
      default: return <Gift className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-sand">
      {/* Header */}
      <div className="bg-gradient-to-r from-natural-blue to-natural-blue-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-warm-orange text-deep-charcoal px-4 py-2 rounded-full font-medium mb-4">
              <Percent className="w-5 h-5" />
              Limited Time Offers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Travel Deals</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Don't miss out on these incredible savings! Book now and save big on your next adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Flash Sale */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">⚡ Flash Sale Alert!</h2>
                  <p className="opacity-90">Up to 31% off selected destinations</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90 mb-1">Ends in:</div>
                <CountdownTimer offerId={1} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">31%</div>
                <div className="text-sm opacity-90">Maximum Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50</div>
                <div className="text-sm opacity-90">Bookings Left</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24h</div>
                <div className="text-sm opacity-90">Time Remaining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 ${offer.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
                  {getOfferTypeIcon(offer.type)}
                  {offer.badge}
                </div>

                {/* Discount */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-lg font-bold">
                  -{offer.discount}%
                </div>

                {/* Countdown */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
                  <CountdownTimer offerId={offer.id} />
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-deep-charcoal hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-deep-charcoal" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-deep-charcoal mb-2 group-hover:text-natural-blue transition-colors">
                    {offer.title}
                  </h3>
                  <div className="flex items-center gap-2 text-cool-gray text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warm-orange fill-current" />
                      <span className="text-sm font-medium">{offer.rating}</span>
                      <span className="text-sm text-cool-gray">({offer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cool-gray">
                      <Calendar className="w-4 h-4" />
                      <span>{offer.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-cool-gray text-sm mb-4 line-clamp-2">
                  {offer.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {offer.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-natural-blue/10 text-natural-blue text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {offer.highlights.length > 3 && (
                      <span className="px-2 py-1 bg-cool-gray/10 text-cool-gray text-xs rounded-full">
                        +{offer.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-natural-blue">
                      ${offer.discountPrice}
                    </span>
                    <span className="text-lg text-cool-gray line-through">
                      ${offer.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      Save ${offer.savings}
                    </span>
                    <span className="text-cool-gray">per person</span>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="mb-4 p-3 bg-warm-orange/10 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-warm-orange-dark">
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">{offer.bookingDeadline}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-natural-blue text-white py-3 rounded-xl hover:bg-natural-blue-dark transition-all duration-300 font-medium shadow-blue hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Book This Deal
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-gentle-olive to-gentle-olive-dark text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Never Miss a Deal Again
          </h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-deep-charcoal focus:outline-none focus:ring-2 focus:ring-warm-orange"
            />
            <button className="px-6 py-3 bg-warm-orange text-deep-charcoal font-semibold rounded-lg hover:bg-warm-orange-dark transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm opacity-80 mt-3">
            Join 50,000+ travelers getting exclusive deals
          </p>
        </div>

        {/* Terms */}
        <div className="mt-8 text-center text-sm text-cool-gray">
          <p>
            * Prices shown are per person based on double occupancy. Terms and conditions apply. 
            Offers subject to availability and may be withdrawn at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOffers;