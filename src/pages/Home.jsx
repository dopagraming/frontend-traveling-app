import { attractions, faqs, specificTrips } from "../data/trips";
import heroImg from "../assests/images/hero.webp";
import SendEmail from "../components/SendEmail";
import DisplayTrips from "../components/DisplayTrips";
import useGetItmes from "../hooks/useGetProducts";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import api from "../lib/axios";
import CategoriesSlider from "../components/CategoriesSlider";

const Home = () => {
  const { isLoading, error, data: categories } = useGetItmes("categories");
  const [trips, setTrips] = useState();
  const [type, setType] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type) {
          const res = await api.get(`/trips?category=${type}`);
          setTrips(res.data.data);
        } else {
          const res = await api.get(`/trips`);
          setTrips(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <main
        className="h-[80vh] bg-cover bg-center text-white flex items-center px-8 relative overflow-hidden"
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
        <CategoriesSlider setType={setType} categories={categories} />
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
        <DisplayTrips data={trips} />
      </section>
      <section className="bg-blue-100 p-8">
        <SendEmail />
      </section>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently asked questions about Hurghada
          </h2>
          <div className="space-y-6">
            {faqs?.map((faq, index) => (
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

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {categories?.map((category) => (
            <div key={category._id} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {category.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {attractions[category]?.map((item, index) => (
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
