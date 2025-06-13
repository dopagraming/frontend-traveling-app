import { attractions, faqs } from "../data/trips";
import heroImg from "../assests/images/hero.webp";
import SendEmail from "../components/SendEmail";
import DisplayTrips from "../components/DisplayTrips";
import useGetItmes from "../hooks/useGetProducts";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import CategoriesSlider from "../components/CategoriesSlider";
import FilterPanel from "../components/filters/FilterPanel";

const Home = () => {
  const { isLoading, error, data: categories } = useGetItmes("categories");
  const [trips, setTrips] = useState();
  const [type, setType] = useState();

  const handleApplyFilters = async (filters) => {
    try {
      const params = new URLSearchParams();

      if (filters.sort) params.append("sort", filters.sort);
      if (filters.categories) params.append("category", filters.categories);
      if (filters.priceMin) params.append("price[gte]", filters.priceMin);
      if (filters.priceMax) params.append("price[lte]", filters.priceMax);
      if (filters.language && filters.language !== "en") {
        params.append("language", filters.language);
      }
      if (filters.city) params.append("city", filters.city);

      const queryString = params.toString() ? `?${params.toString()}` : "";
      console.log(`/trips${queryString}`);
      const res = await api.get(`/trips${queryString}`);
      setTrips(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await api.get("/trips");
        setTrips(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-soft-sand">
      <div className="text-sea-blue">Loading...</div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-soft-sand">
      <div className="text-red-600">Error: {error.message}</div>
    </div>;
  }

  return (
    <div className="bg-soft-sand">
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
          <p className="text-lg mb-6">
            Explore Barcelona's Modernist architecture
          </p>
          <button className="bg-sunny-yellow text-deep-charcoal px-6 py-3 rounded-lg font-medium hover:bg-sunny-yellow-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
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

      <section className="px-4 md:px-12 container mx-auto my-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full md:w-72">
            <div className="lg:sticky lg:top-4">
              <FilterPanel onApplyFilters={handleApplyFilters} />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-deep-charcoal">Day trips</h2>
            <DisplayTrips data={trips} />
          </div>
        </div>
      </section>

      <section className="bg-sea-blue/10 p-8">
        <SendEmail />
      </section>

      <section className="py-12 px-4 bg-soft-sand">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-6">
            Customer's top-rated Hurghada activities
          </h2>
          <div className="space-y-8">
            {["couples", "families", "solo"].map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold capitalize text-deep-charcoal">
                  Recommended for {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 px-4 bg-soft-sand">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-8">
            Frequently asked questions about Hurghada
          </h2>
          <div className="space-y-6">
            {faqs?.map((faq, index) => (
              <div key={index} className="border-b border-sea-blue/20 pb-6">
                <h3 className="text-lg font-semibold text-deep-charcoal mb-2">
                  {faq.question}
                </h3>
                <p className="text-cool-gray">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 px-4 bg-soft-sand">
        <div className="max-w-7xl mx-auto">
          {categories?.map((category) => (
            <div key={category._id} className="mb-8">
              <h2 className="text-xl font-bold text-deep-charcoal mb-4">
                {category.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {attractions[category]?.map((item, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-soft-sand border border-sea-blue/30 rounded-full text-sm hover:bg-sea-blue/10 hover:border-sea-blue transition-colors text-deep-charcoal"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-12 px-4 bg-soft-sand">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-deep-charcoal mb-6">
            What people are saying about Hurghada
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-sunny-yellow">{"★".repeat(5)}</div>
            <span className="text-cool-gray">4.8 out of 5</span>
            <span className="text-cool-gray/70">(based on 2,456 reviews)</span>
          </div>
          <p className="text-cool-gray">
            "We'll organized tour with amazing and helpful guides. The whole
            experience left lasting memories that we'll cherish forever. Highly
            recommended for anyone visiting Hurghada!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;