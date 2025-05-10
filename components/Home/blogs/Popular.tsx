"use client";
import Image from "next/image";
import React from "react";
import Blog from "./Blog";

const blogs = [
  {
    title: "General IoT",
    description:
      "These blogs cover a broad range of IoT-related news, instructional guides and other content.",
    image: "/assets/home/blog.png",
  },
  {
    title: "General IoT",
    description:
      "These blogs cover a broad range of IoT-related news, instructional guides and other content.",
    image: "/assets/home/blog.png",
  },
  {
    title: "General IoT",
    description:
      "These blogs cover a broad range of IoT-related news, instructional guides and other content.",
    image: "/assets/home/blog.png",
  },
];

const Popular = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 md:gap-8 bg-[#FAF8FF] py-[10vw] md:py-[4vw]">
      {/* Left Section */}
      <div className="lg:w-5/12 flex flex-col justify-center items-start">
        <p className="text-newBlue text-lg md:text-xl font-medium mb-1 pl-[5vw] md:pl-[3vw]">
          Trending
        </p>
        <h2 className="text-3xl md:text-6xl font-bold mb-2 pl-[5vw] md:pl-[3vw]">Our Popular Blogs</h2>
        <p className="text-newGrey text-lg md:text-2xl mb-3 md:mb-6 pl-[5vw] md:pl-[3vw] w-6/12">
          Stay informed with our latest insights
        </p>
        <div className="w-full mt-[3vw] md:block hidden">
          <Image
            src="/assets/home/popular-blogs.png"
            alt="Popular Blogs Illustration"
            width={1000}
            height={1000}
            className="w-11/12"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-7/12 space-y-6 pr-[5vw] md:pr-[3vw] pl-[5vw] md:pl-0">
        {blogs.map((blog, index) => {
          return <Blog {...blog} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Popular;
