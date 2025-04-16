import { format } from "date-fns";
import React from "react";

const Reviews = ({ trip }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8" id="reviews">
      <h2 className="text-xl font-bold mb-6">
        Highlighted reviews from other travelers
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {trip?.reviews?.map((review) => (
          <div key={review._id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex text-yellow-400 mb-2">
              {"★".repeat(review.rating)}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                {review.user}
              </span>
              <div>
                <p className="font-semibold">
                  {review.user} — {review?.country && `${review?.country}`}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(review.date), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{review?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
