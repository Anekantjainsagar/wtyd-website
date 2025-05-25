"use client";
import Blog from "./Blog";
import AddNewBlog from "./AddNewBlog";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { BlogType } from "../Home/blogs/VerticalBlog";

export type BlogStatus = "pending" | "uploaded" | "rejected";

const BlogsDashboard = () => {
  const context = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) {
    throw new Error("Blogs must be used within a UserProvider");
  }

  const { myBlogs } = context;

  return (
    <div className="px-[5vw] md:px-[3vw] py-[4vw]">
      <AddNewBlog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="mb-3 md:mb-8 flex items-center justify-between">
        <h3 className="text-newBlue text-2xl md:text-4xl font-semibold">
          Blogs Dashboard
        </h3>
        <button
          className="md:text-xl px-6 font-medium py-1.5 md:py-2 bg-newBlue rounded-lg text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Add Blog
        </button>
      </div>

      <div className="grid gap-6">
        {myBlogs.map((blog: BlogType, idx: number) => (
          <Blog key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsDashboard;
