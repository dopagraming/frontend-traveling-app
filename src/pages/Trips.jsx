import TripCard from "../components/TripCard";
import useGetItmes from "../hooks/useGetProducts";

const Trips = () => {
  const { data, isLoading, error } = useGetItmes("trips");
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Available Trips</h1>
        <div className="text-gray-600">
          Showing {data.length} amazing destinations
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No trips available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Trips;
