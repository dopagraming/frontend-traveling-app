import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Calendar, Star } from "lucide-react";
import DisplayTrips from "../components/DisplayTrips";
import { FaOpencart } from "react-icons/fa6";

// Mock wishlist data

const Wishlist = () => {
  const [trips, setTrips] = useState();
  useEffect(() => {
    setTrips(JSON.parse(localStorage.getItem("wishlist")));
  }, []);
  return (
    <section className="px-4 md:px-12 container mx-auto my-5">
      {trips ? (
        <>
          <h2 className="text-xl mb-5">Your Wishlist</h2>
          <DisplayTrips data={trips} />
        </>
      ) : (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
          <FaOpencart style={{ fontSize: "300px" }} />
          <h2 className="text-4xl">Wishlist is empty</h2>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
