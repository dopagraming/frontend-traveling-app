import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, CreditCard, Star } from "lucide-react";
import TripCard from "../components/TripCard";
import {
  attractions,
  categories,
  faqs,
  specificTrips,
  trips,
} from "../data/trips";
import heroImg from "../assests/images/hero.webp";
import { LuCastle } from "react-icons/lu";
import { CiForkAndKnife } from "react-icons/ci";
import { PiMountainsLight } from "react-icons/pi";
import { MdOutlineSportsHandball } from "react-icons/md";
import SendEmail from "../components/SendEmail";
import api from "../lib/axios";
const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await api.get("trips");
      setTrips(response.data.data);
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    console.log(trips);
  }, [trips]);

  return (
    <>
      <main
        className="h-[80vh] bg-cover bg-center text-white flex items-center px-8 relative"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Travel memories you'll never forget
          </h1>
          <p className="text-lg mb-2">
            Explore Barcelona's Modernist architecture
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-md">
            Learn more
          </button>
        </div>
        <div className="flex justify-center gap-20 text-white font-bold text-2xl absolute bottom-0 m-auto left-[50%] translate-x-[-50%] z-20">
          <button className="flex items-center px-10 py-3 border-b-2 border-transparent hover:border-blue-600 bg-white text-gray-900 rounded-t-lg ">
            <LuCastle className="me-1" />
            <p>Culture</p>
          </button>
          <button className="flex items-center px-4 py-2 border-b-2 border-transparent hover:border-blue-600 ">
            <CiForkAndKnife className="me-1" />
            <p>Food</p>
          </button>
          <button className="flex items-center px-4 py-2 border-b-2 border-transparent hover:border-blue-600 ">
            <PiMountainsLight className="me-1" />
            <p>Nature</p>
          </button>
          <button className="flex items-center px-4 py-2 border-b-2 border-transparent hover:border-blue-600 ">
            <MdOutlineSportsHandball className="me-1" />
            <p>Sports</p>
          </button>
        </div>
        <div
          className="overlay absolute w-full h-full left-0 top-0"
          style={{
            backgroundImage: "linear-gradient(to right, #000000cf, #1e1e1e61)",
          }}
        ></div>
      </main>

      <section className="px-4 md:px-12 container mx-auto my-5">
        <h2 className="text-2xl font-bold mb-6">
          Unforgettable cultural experiences
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trips?.map((item) => (
            <TripCard trip={item} />
          ))}
        </div>
      </section>
      <section className="bg-blue-100 p-8">
        <SendEmail />
      </section>

      {/* Recommended Activities Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer's top-rated Hurghada activities
          </h2>
          <div className="space-y-8">
            {["couples", "families", "solo"].map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold capitalize">
                  Recommended for {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {specificTrips
                    .filter((trip) => trip.category === category)
                    .map((trip) => (
                      <div
                        key={trip.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-emerald-600 text-white px-2 py-1 rounded-md text-sm">
                            Top Pick
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {trip.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>{trip.duration}</span>
                            <span>•</span>
                            <span>Skip the line</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-yellow-400">
                              {"★".repeat(Math.floor(trip.rating))}
                              {"☆".repeat(5 - Math.floor(trip.rating))}
                            </div>
                            <span className="text-sm text-gray-600">
                              ({trip.reviews})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">
                                From
                              </span>
                              <span className="text-lg font-bold text-gray-900 ml-1">
                                ${trip.price}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              per person
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently asked questions about Hurghada
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {attractions[category].map((item, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What people are saying about Hurghada
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">{"★".repeat(5)}</div>
            <span className="text-gray-600">4.8 out of 5</span>
            <span className="text-gray-400">(based on 2,456 reviews)</span>
          </div>
          <p className="text-gray-600">
            "We'll organized tour with amazing and helpful guides. The whole
            experience left lasting memories that we'll cherish forever. Highly
            recommended for anyone visiting Hurghada!"
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
