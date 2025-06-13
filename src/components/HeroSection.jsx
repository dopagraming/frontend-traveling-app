import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    people: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search data:', searchData);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-natural-blue via-natural-blue-light to-muted-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-warm-orange/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gentle-olive/30 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-soft-sand/20 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="text-center text-white mb-12">
          <div className="inline-flex items-center mb-6">
            <Plane className="w-8 h-8 mr-3 animate-float" />
            <span className="text-lg font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Discover Amazing Places
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')}
            <span className="block text-warm-orange">{t('hero.titleAccent')}</span>
            {t('hero.titleEnd')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="glass rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative">
                <label className="block text-sm font-medium text-deep-charcoal dark:text-gray-300 mb-2">
                  {t('hero.whereTo')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-natural-blue/30 focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand dark:bg-gray-800 text-deep-charcoal dark:text-white"
                  />
                </div>
              </div>

              {/* Check In */}
              <div className="relative">
                <label className="block text-sm font-medium text-deep-charcoal dark:text-gray-300 mb-2">
                  {t('hero.checkIn')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-natural-blue/30 focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand dark:bg-gray-800 text-deep-charcoal dark:text-white"
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="relative">
                <label className="block text-sm font-medium text-deep-charcoal dark:text-gray-300 mb-2">
                  {t('hero.checkOut')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-natural-blue/30 focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand dark:bg-gray-800 text-deep-charcoal dark:text-white"
                  />
                </div>
              </div>

              {/* People */}
              <div className="relative">
                <label className="block text-sm font-medium text-deep-charcoal dark:text-gray-300 mb-2">
                  {t('hero.travelers')}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural-blue w-5 h-5" />
                  <select
                    value={searchData.people}
                    onChange={(e) => setSearchData({...searchData, people: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-natural-blue/30 focus:border-natural-blue focus:ring-2 focus:ring-natural-blue/20 bg-soft-sand dark:bg-gray-800 text-deep-charcoal dark:text-white"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? t('hero.person') : t('hero.people')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 bg-warm-orange text-deep-charcoal font-semibold rounded-xl hover:bg-warm-orange-dark transition-all duration-300 shadow-warm hover:shadow-xl transform hover:-translate-y-1"
              >
                <Search className="w-5 h-5 mr-2" />
                {t('hero.searchAdventures')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-20">
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="#FFF9F0"
            className="dark:fill-gray-900"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;