"use client";
import React, { useState } from "react";

const BlogFilter = () => {
  const [selected, setSelected] = useState("blogs");

  return (
    <div className="flex items-center">
      <div className="relative flex items-center bg-[#0043C0]/15 h-[6vh] rounded-full px-5 w-fit">
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-2 h-[4.5vh] w-[6vw] rounded-full bg-blue-600 transition-all duration-300 ease-in-out
            ${selected === "today" ? "translate-x-[5.25vw]" : "translate-x-0"}
          `}
        ></div>

        <button
          className={`z-10 w-[5vw] text-lg font-semibold rounded-full transition-colors duration-300 ${
            selected === "blogs" ? "text-white" : "text-gray-600"
          }`}
          onClick={() => setSelected("blogs")}
        >
          BLOGS
        </button>
        <button
          className={`z-10 w-[5vw] text-lg font-semibold rounded-full transition-colors duration-300 ${
            selected === "today" ? "text-white" : "text-gray-600"
          }`}
          onClick={() => setSelected("today")}
        >
          Today
        </button>
      </div>
      <div className="w-full h-[3px] bg-[#0043C0]/15"></div>
    </div>
  );
};

export default BlogFilter;
