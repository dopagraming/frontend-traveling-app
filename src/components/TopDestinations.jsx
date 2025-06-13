import React from 'react';
import { Star, MapPin, Heart, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
    rating: 4.9,
    reviews: 2847,
    price: "$299",
    description: "Stunning sunsets and white-washed buildings",
    category: "Island Paradise"
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=300&fit=crop",
    rating: 4.8,
    reviews: 1923,
    price: "$399",
    description: "Ancient temples and cherry blossoms",
    category: "Cultural Heritage"
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=300&fit=crop",
    rating: 4.9,
    reviews: 3156,
    price: "$599",
    description: "Mystical ancient Incan citadel",
    category: "Adventure"
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop",
    rating: 4.7,
    reviews: 2134,
    price: "$249",
    description: "Tropical paradise with rich culture",
    category: "Tropical"
  },
  {
    id: 5,
    name: "Iceland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    rating: 4.8,
    reviews: 1876,
    price: "$699",
    description: "Northern lights and dramatic landscapes",
    category: "Nature"
  },
  {
    id: 6,
    name: "Morocco",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=500&h=300&fit=crop",
    rating: 4.6,
    reviews: 1654,
    price: "$349",
    description: "Vibrant markets and desert adventures",
    category: "Cultural"
  }
];

const TopDestinations = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-soft-sand dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-warm-orange/20 text-warm-orange-dark rounded-full text-sm font-medium mb-4">
            {t('destinations.popularDestinations')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal dark:text-white mb-6">
            {t('destinations.topDestinations')}
          </h2>
          <p className="text-xl text-cool-gray dark:text-gray-400 max-w-2xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-deep-charcoal text-sm font-medium rounded-full">
                    {destination.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-deep-charcoal hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-deep-charcoal" />
                  </button>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-deep-charcoal dark:text-white group-hover:text-natural-blue transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warm-orange fill-current" />
                    <span className="text-sm font-medium text-deep-charcoal dark:text-white">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-cool-gray dark:text-gray-400 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-cool-gray dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-cool-gray dark:text-gray-400">{t('destinations.from')}</span>
                    <div className="text-xl font-bold text-natural-blue">
                      {destination.price}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-4 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-all duration-300 font-medium shadow-blue hover:shadow-xl transform hover:-translate-y-0.5">
                  {t('destinations.exploreNow')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1">
            {t('destinations.viewAllDestinations')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;