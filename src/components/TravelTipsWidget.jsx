import React, { useState } from 'react';
import { Lightbulb, X, ChevronRight, MapPin, Clock, DollarSign } from 'lucide-react';

const tips = [
  {
    id: 1,
    title: "Pack Light, Travel Smart",
    content: "Bring only essentials and choose versatile clothing items that can be mixed and matched.",
    icon: <MapPin className="w-5 h-5" />,
    category: "Packing"
  },
  {
    id: 2,
    title: "Book Flights on Tuesday",
    content: "Airlines often release deals on Monday nights, making Tuesday the best day to find discounts.",
    icon: <Clock className="w-5 h-5" />,
    category: "Timing"
  },
  {
    id: 3,
    title: "Use Local Currency",
    content: "Always pay in local currency to avoid dynamic currency conversion fees.",
    icon: <DollarSign className="w-5 h-5" />,
    category: "Money"
  }
];

const TravelTipsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <>
      {/* Floating Widget Button */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-warm-orange text-deep-charcoal p-4 rounded-full shadow-warm hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-float"
        >
          <Lightbulb className="w-6 h-6 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Widget Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Widget Content */}
          <div className="relative bg-soft-sand rounded-2xl p-6 max-w-md w-full shadow-2xl transform animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warm-orange/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-warm-orange" />
                </div>
                <h3 className="text-xl font-bold text-deep-charcoal">Travel Tips</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-cool-gray/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-cool-gray" />
              </button>
            </div>

            {/* Current Tip */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-natural-blue/20 rounded-lg text-natural-blue">
                  {tips[currentTip].icon}
                </div>
                <span className="text-sm font-medium text-natural-blue">
                  {tips[currentTip].category}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-deep-charcoal mb-2">
                {tips[currentTip].title}
              </h4>
              
              <p className="text-cool-gray leading-relaxed">
                {tips[currentTip].content}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {tips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTip(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTip ? 'bg-warm-orange' : 'bg-cool-gray/30'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTip}
                className="flex items-center gap-2 text-natural-blue hover:text-natural-blue-dark transition-colors"
              >
                <span className="text-sm font-medium">Next Tip</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-cool-gray/20">
              <button className="w-full py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-all duration-300 font-medium">
                View All Travel Tips
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TravelTipsWidget;