"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogFilter from "./BlogFilter";
import UserContext, { createMarkupText } from "@/context/UserContext";

const RecentBlog = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Blogs must be used within a UserProvider");
  }

  const { blogs } = context;
  const blog = blogs[0];

  return (
    <div className="bg-white flex md:flex-row flex-col py-[5vw] md:py-[4vw] px-[5vw] md:px-[3vw]">
      <div className="md:w-1/2 bg-white p-4 md:p-6 rounded-md shadow-lg">
        <Image
          width={1000}
          height={1000}
          src={blog?.coverImage}
          alt={blog?.title}
          className="rounded-md"
        />
      </div>
      <div className="md:w-1/2 px-0 md:px-8 md:py-8 py-6">
        <BlogFilter />
        <h3 className="text-3xl md:text-6xl font-bold leading-tight text-gray-800 mb-2 md:mb-4 mt-[2vw]">
          {blog?.title}
        </h3>
        <p
          className="text-newGrey text-lg md:text-xl mb-6 tracking-wide"
          dangerouslySetInnerHTML={createMarkupText(
            blog?.content?.slice(0, 150) + "..."
          )}
        />
        <Link
          href="/"
          className="flex items-center text-lg md:text-xl text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
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
  );
};

export default RecentBlog;
