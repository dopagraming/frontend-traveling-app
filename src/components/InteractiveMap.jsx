import React, { useState } from "react";
import { MapPin, Navigation, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const locations = [
  {
    id: 1,
    name: "Paris",
    lat: 48.8566,
    lng: 2.3522,
    visitors: "2.3M",
    image: "🗼",
  },
  {
    id: 2,
    name: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    visitors: "1.8M",
    image: "🏯",
  },
  {
    id: 3,
    name: "New York",
    lat: 40.7128,
    lng: -74.006,
    visitors: "3.1M",
    image: "🗽",
  },
  {
    id: 4,
    name: "London",
    lat: 51.5074,
    lng: -0.1278,
    visitors: "2.7M",
    image: "🏰",
  },
  {
    id: 5,
    name: "Sydney",
    lat: -33.8688,
    lng: 151.2093,
    visitors: "1.5M",
    image: "🌉",
  },
];

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const { t } = useTranslation();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-natural-blue/5 to-gentle-olive/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-natural-blue/20 text-natural-blue-dark rounded-full text-sm font-medium mb-4">
            {t("map.sectionTag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6">
            {t("map.title")}
          </h2>
          <p className="text-xl text-cool-gray max-w-2xl mx-auto">
            {t("map.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-natural-blue to-muted-blue rounded-2xl p-8 shadow-blue">
              {/* Mock World Map */}
              <div className="relative h-96 bg-soft-sand/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-natural-blue/10 to-gentle-olive/10"></div>

                {/* Location Pins */}
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedLocation?.id === location.id
                        ? "scale-125 z-10"
                        : "hover:scale-110"
                    }`}
                    style={{
                      left: `${((location.lng + 180) / 360) * 100}%`,
                      top: `${((90 - location.lat) / 180) * 100}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-warm-orange rounded-full flex items-center justify-center shadow-warm animate-pulse">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      {selectedLocation?.id === location.id && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                          <span className="text-sm font-medium text-deep-charcoal">
                            {location.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}

                {/* User Location */}
                {userLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                    style={{
                      left: `${((userLocation.lng + 180) / 360) * 100}%`,
                      top: `${((90 - userLocation.lat) / 180) * 100}%`,
                    }}
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                )}
              </div>

              {/* Get Location Button */}
              <button
                onClick={getUserLocation}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg"
              >
                <Navigation className="w-5 h-5 text-natural-blue" />
              </button>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Location Info */}
            {selectedLocation ? (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{selectedLocation.image}</div>
                  <h3 className="text-2xl font-bold text-deep-charcoal">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-cool-gray">
                    {selectedLocation.visitors} annual visitors
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-natural-blue/10 rounded-lg">
                    <span className="text-sm font-medium text-deep-charcoal">
                      {t("map.bestTime")}
                    </span>
                    <span className="text-sm text-natural-blue">
                      {t("map.season")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-warm-orange/10 rounded-lg">
                    <span className="text-sm font-medium text-deep-charcoal">
                      {t("map.averageCost")}
                    </span>
                    <span className="text-sm text-warm-orange-dark">
                      $150/{t("map.day")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gentle-olive/10 rounded-lg">
                    <span className="text-sm font-medium text-deep-charcoal">
                      {t("map.flightTime")}
                    </span>
                    <span className="text-sm text-gentle-olive-dark">
                      {t("map.flightDuration")}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-all duration-300 font-medium">
                  {t("map.viewPackages")}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                <MapPin className="w-12 h-12 text-cool-gray mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-deep-charcoal mb-2">
                  {t("map.selectDestination")}
                </h3>
                <p className="text-cool-gray">{t("map.clickToExplore")}</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h4 className="text-lg font-semibold text-deep-charcoal mb-4">
                {t("map.quickActions")}
              </h4>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-natural-blue/10 rounded-lg hover:bg-natural-blue/20 transition-colors">
                  <Zap className="w-5 h-5 text-natural-blue" />
                  <span className="text-sm font-medium text-deep-charcoal">
                    {t("map.getRecommendations")}
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-warm-orange/10 rounded-lg hover:bg-warm-orange/20 transition-colors">
                  <Navigation className="w-5 h-5 text-warm-orange" />
                  <span className="text-sm font-medium text-deep-charcoal">
                    {t("map.planRoute")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
