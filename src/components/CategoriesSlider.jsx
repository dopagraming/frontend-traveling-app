import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CategoriesSlider = ({ categories, setType }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handleNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCategories = categories.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <div className="hidden overflow-x-auto w-full xl:flex justify-center gap-10 text-white font-bold text-2xl absolute bottom-0 m-auto left-1/2 translate-x-[-50%] z-20 px-5">
      <button
        onClick={handlePrev}
        className={
          startIndex === 0
            ? "hidden"
            : "ms-4 hidden xl:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow"
        }
      >
        <IoIosArrowBack className="text-black" />
      </button>

      <div className="flex flex-1 justify-center gap-10">
        <button
          className="px-10 py-3 border-b-2 border-transparent hover:border-blue-600 bg-white text-gray-900 rounded-t-lg"
          onClick={() => setType("")}
        >
          <p>All Trips</p>
        </button>

        {visibleCategories.map((category) => (
          <button
            key={category._id}
            className="px-10 py-3 border-b-2 border-transparent hover:border-blue-600 bg-white text-gray-900 rounded-t-lg"
            onClick={() => setType(category._id)}
          >
            <p>{category.title}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className={
          startIndex + visibleCount >= categories.length
            ? "hidden"
            : "me-4 hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow"
        }
      >
        <IoIosArrowForward className="text-black" />
      </button>
    </div>
  );
};

export default CategoriesSlider;
