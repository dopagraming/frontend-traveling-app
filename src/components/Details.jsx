import React from "react";

const Details = ({trip}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About this trip</h2>
      <p className="text-gray-700 text-lg mb-6">
        Swim with dolphins in their habitat. Snorkel at two spots. Try exciting
        water sports like banana boat. Relax on board, enjoy the views. Savor a
        delicious lunch with refreshments.
      </p>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <span className="text-2xl">🕒</span>
          <div>
            <h3 className="font-semibold">Duration {trip.duration} hours</h3>
            <p className="text-gray-600">
              Check availability to see starting times.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-2xl">🎤</span>
          <div>
            <h3 className="font-semibold">Live tour guide</h3>
            <p className="text-gray-600">{trip?.tripLanguage}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-2xl">🚐</span>
          <div>
            <h3 className="font-semibold">Pickup included</h3>
            <p className="text-gray-600">
              Please wait in the hotel lobby 10 minutes before your scheduled
              pickup time. Drivers will wait no longer than 10 minutes after the
              scheduled pickup time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
