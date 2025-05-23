import TripCard from "./TripCard";

const DisplayTrips = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((item) => (
        <TripCard trip={item} />
      ))}
    </div>
  );
};

export default DisplayTrips;
