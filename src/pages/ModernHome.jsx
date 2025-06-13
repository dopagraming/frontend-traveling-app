import React from 'react';
import HeroSection from '../components/HeroSection';
import TopDestinations from '../components/TopDestinations';
import InteractiveMap from '../components/InteractiveMap';
import BlogPreview from '../components/BlogPreview';
import TravelTipsWidget from '../components/TravelTipsWidget';

const ModernHome = () => {
  return (
    <div className="bg-soft-sand">
      <HeroSection />
      <TopDestinations />
      <InteractiveMap />
      <BlogPreview />
      <TravelTipsWidget />
    </div>
  );
};

export default ModernHome;