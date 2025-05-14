"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Search } from "lucide-react";

const InputSections = ({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex items-center justify-center md:px-0 px-[5vw] bg-[#FAF8FF] py-[5vw]">
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative md:w-[40vw]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-newBlue" />
          <input
            type="text"
            value={searchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setValue(searchValue);
              }
            }}
            onChange={(e) => {
              if (e.target.value == "") {
                setValue("");
              }
              setSearchValue(e.target.value);
            }}
            placeholder="What would you like to explore today ?"
            className="w-full md:text-lg pl-12 pr-4 py-2 md:py-3 border-2 border-newBlue rounded-md outline-none bg-white text-gray-700"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => setValue(searchValue)}
          className="bg-newBlue text-white px-6 md:px-12 py-2 md:py-3 md:text-lg rounded-md font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default InputSections;
