import { useState } from "react";
import { format } from "date-fns";

const BookingSection = () => {
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [adults, setAdults] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "MMM dd, yyyy")
  );
  const [language, setLanguage] = useState("English");

  const handleCheck = () => {
    setShowBookingDetails(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-[#1B2B3F] text-white p-6 rounded-lg mb-6">
        <h2 className="text-xl mb-4">
          Select participants, date, and language
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <button className="w-full bg-white text-black py-2 px-4 rounded-lg flex items-center justify-between">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Adult x {adults}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="relative">
            <button className="w-full bg-white text-black py-2 px-4 rounded-lg flex items-center justify-between">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {selectedDate}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="relative">
            <button className="w-full bg-white text-black py-2 px-4 rounded-lg flex items-center justify-between">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                {language}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={handleCheck}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
        >
          Check availability
        </button>
      </div>

      {showBookingDetails && (
        <div className="border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Pickup from Hurghada</h2>
            <button className="text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Swim with dolphins in their natural habitat on our unforgettable .
            Witness the playful antics of these majestic creatures and create
            memories that will last a lifetime. We prioritize responsible
            tourism and ethical practices to protect the dolphins .
          </p>

          <div className="flex gap-8 mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>7 hours</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Guide: English</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Starting time</h3>
            <p>9:00 AM</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center text-gray-600 mb-2">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>Cancel before 9:00 AM on April 16 for a full refund</span>
            </div>
            <div className="flex items-center text-blue-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>
                You can{" "}
                <button className="underline">reserve now & pay later</button>{" "}
                with this activity option.
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>1 adult</span>
              <div>
                <span className="text-red-500 text-2xl font-bold">$997.68</span>
                <span className="text-gray-500 line-through ml-2">
                  $1,295.69
                </span>
                <span className="text-red-500 ml-2">-23%</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">All taxes and fees included</p>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50">
                Book now
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSection;
