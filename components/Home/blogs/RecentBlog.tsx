import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogFilter from "./BlogFilter";

const RecentBlog = () => {
  return (
    <div className="bg-white py-[4vw] px-[3vw]">
      <div className="flex">
        <div className="md:w-1/2 bg-white p-6 rounded-md shadow-lg">
          <Image
            width={1000}
            height={1000}
            src="/assets/home/blog.png"
            alt="Laptop on wooden table with coffee and notepad"
            className="rounded-md"
          />
        </div>
        <div className="md:w-1/2 p-6 md:p-8">
          <BlogFilter />
          <h3 className="text-6xl font-bold leading-tight text-gray-800 mb-4 mt-[2vw]">
            Nvidia GTC Sets Bold AI Vision
          </h3>
          <p className="text-newGrey text-xl mb-6 tracking-wide">
            Nvidia GTC 2025 was packed with significant announcements and
            showcased the company&apos;s continued dominance in the AI hardware
            space. However, the event also highlighted potential challenges and
            shifts in the competitive landscape.
          </p>
          <Link
            href="/"
            className="flex items-center text-xl text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
          >
            View more Blogs
            <svg
              className="ml-2 -mr-0.5 h-[20px] w-[20px]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
