import React from "react";
import { Search } from "lucide-react";

const InputSections = () => {
  return (
    <div className="flex items-center justify-center bg-[#FAF8FF] md:px-0 px-[5vw] py-[5vw]">
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative md:w-[40vw]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-newBlue" />
          <input
            type="text"
            placeholder="What would you like to explore today ?"
            className="w-full md:text-lg pl-12 pr-4 py-2 md:py-3 border-2 border-newBlue rounded-md outline-none bg-white text-gray-700"
          />
        </div>

        {/* Button */}
        <button className="bg-newBlue text-white px-6 md:px-12 py-2 md:py-3 md:text-lg rounded-md font-semibold transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default InputSections;
