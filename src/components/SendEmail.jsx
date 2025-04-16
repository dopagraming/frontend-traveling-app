import React, { useState } from "react";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // const handleSubscribe = (e) => {
  //   e.preventDefault();
  //   // Handle newsletter subscription
  //   console.log("Subscribed:", email);
  //   setEmail("");
  // };
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <img
          src="images/newsletter-background.jpg"
          alt="Desert adventure"
          className="rounded-lg w-full h-64 object-cover"
        />
      </div>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Discover the wonder of travel every week
        </h2>
        <p className="text-gray-600">
          Get personalized travel inspiration, the latest travel hacks, and
          exclusive deals straight to your inbox.
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>
        <p className="text-xs text-gray-500">
          By signing up, you agree to receive promotional emails. You can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default SendEmail;
