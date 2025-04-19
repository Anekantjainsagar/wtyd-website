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
    "px-8 py-2.5 flex items-center gap-x-2.5 rounded-full text-white font-semibold text-lg";
  if (status === "Pending") return `${common} bg-blue-600 hover:bg-blue-700`;
  return `${common} bg-gray-400 cursor-not-allowed`;
};

const Blog = ({ blog }: { blog: BlogStruct }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1000}
          height={1000}
          className="rounded-xl w-[20vw] h-[10vw] object-cover"
        />
        <div>
          <p className="font-medium text-3xl">{blog.title}</p>
          <p className="text-gray-600 text-lg mt-2">{blog.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span
          className={`w-4 h-4 rounded-full ${getStatusColor(blog.status)}`}
        ></span>
        <span className="text-xl font-medium">{blog.status}</span>
      </div>

      <div className="flex items-center gap-10">
        <button className={getButtonClasses(blog.status)}>
          <GoPencil className="text-xl" /> Edit Blog
        </button>

        <button className="px-8 py-2.5 flex items-center gap-x-2.5 rounded-full bg-red-600 text-white font-semibold text-lg hover:bg-red-700">
          <MdOutlineDelete className="text-2xl" /> Delete Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
