import React from "react";
import { useNavigate } from "react-router";

const SearchingResult = ({ searched, isLoading, isError, data, setSearch }) => {
  const navigate = useNavigate();
  return (
    <>
      {searched?.trim() && (
        <div className="absolute left-0 top-0 z-50 bg-white container mx-auto my-10 rounded-md overflow-y-scroll max-h-[200px]">
          <h2 className="text-2xl font-bold mb-4 px-4 md:px-12 ">
            Search Results for "{searched}"
          </h2>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong while searching.</p>}
          {data?.length > 0 ? (
            <div>
              {data?.map((trip) => (
                <p
                  className="hover:bg-slate-200 transition cursor-pointer px-4 md:px-12 py-2"
                  key={trip?.id}
                  onClick={() => {
                    setSearch("");
                    navigate(`/trips/${trip?.id}`);
                  }}
                >
                  {trip?.title}
                </p>
              ))}
            </div>
          ) : (
            !isLoading && (
              <p className="text-gray-500">No trips found for "{searched}"</p>
            )
          )}
        </div>
      )}
    </>
  );
};

export default SearchingResult;
