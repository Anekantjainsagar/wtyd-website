import React from "react";
import Image from "next/image";
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { BlogStatus, BlogStruct } from "./BlogsDashboard";

const getStatusColor = (status: BlogStatus) => {
  switch (status) {
    case "Pending":
      return "text-blue-600 bg-blue-600";
    case "Uploaded":
      return "text-green-600 bg-green-600";
    case "Rejected":
      return "text-red-600 bg-red-600";
    default:
      return "";
  }
};

const getButtonClasses = (status: BlogStatus) => {
  const common =
    "px-7 md:px-8 py-2.5 flex items-center gap-x-2.5 rounded-full text-white font-semibold md:text-lg";
  if (status === "Pending") return `${common} bg-blue-600 hover:bg-blue-700`;
  return `${common} bg-gray-400 cursor-not-allowed`;
};

const Blog = ({ blog }: { blog: BlogStruct }) => {
  return (
    <div className="bg-white relative shadow-md rounded-xl p-4 flex md:flex-row flex-col items-center justify-between">
      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-6">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1000}
          height={1000}
          className="rounded-xl md:w-[20vw] md:h-[10vw] object-cover"
        />
        <div className="w-full">
          <p className="font-medium text-start text-2xl md:text-3xl w-full">
            {blog.title}
          </p>
          <p className="text-gray-600 text-lg mt-1.5 md:mt-2">{blog.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-2.5 md:static absolute top-6 right-6 bg-white md:border-0 border border-gray-300 md:rounded-none rounded-full md:py-0 py-1 md:px-0 px-2">
        <span
          className={`w-2 md:w-4 h-2 md:h-4 rounded-full ${getStatusColor(
            blog.status
          )}`}
        ></span>
        <span className="text-sm md:text-xl md:font-medium">{blog.status}</span>
      </div>

      <div className="flex items-center gap-4 md:gap-10 md:mt-0 mt-3">
        <button className={getButtonClasses(blog.status)}>
          <GoPencil className="md:text-xl" /> Edit Blog
        </button>

        <button className="px-7 md:px-8 py-2.5 flex items-center gap-x-2.5 rounded-full bg-red-600 text-white font-semibold md:text-lg hover:bg-red-700">
          <MdOutlineDelete className="text-lg md:text-2xl" /> Delete Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
