"use client";
import Blog from "@/components/Home/blogs/Blog";
import RecentBlog from "@/components/Home/blogs/RecentBlog";
import VerticalBlog, { BlogType } from "@/components/Home/blogs/VerticalBlog";
import UserContext from "@/context/UserContext";
import InputSections from "@/sections/Blogs/InputSections";
import React, { useContext, useEffect, useState } from "react";

const BlogsPage = () => {
  const context = useContext(UserContext);
  const [searchText, setSearchText] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);

  if (!context) {
    throw new Error("Blogs must be used within a UserProvider");
  }

  const { blogs } = context;

  useEffect(() => {
    const data = blogs?.filter((blog) => {
      if (searchText != "") {
        return blog.title.toLowerCase().includes(searchText.toLowerCase());
      }
      return true;
    });
    setFilteredBlogs(data);
  }, [searchText, blogs]);

  return (
    <div className="pt-[18vw] md:pt-[6vw]">
      <InputSections setValue={setSearchText} />
      <h4 className="px-[5vw] md:px-[3vw] text-3xl md:text-6xl font-medium mt-6">
        Blogs
      </h4>
      <RecentBlog />

      {filteredBlogs && filteredBlogs.length > 0 ? (
        Array.from({ length: Math.ceil(filteredBlogs.length / 3) }).map(
          (_, groupIndex) => {
            const start = groupIndex * 3;
            const verticalBlog = filteredBlogs[start];
            const blogItems = filteredBlogs.slice(start + 1, start + 3);

            const isReversed = groupIndex % 2 === 1;

            return (
              <div
                key={groupIndex}
                className={`px-[5vw] md:px-[3vw] gap-x-6 flex ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } flex-col items-center md:space-y-0 space-y-6 mt-6`}
              >
                <div className="md:w-5/12 md:pr-6">
                  <VerticalBlog {...verticalBlog} />
                </div>
                <div className="md:w-7/12 space-y-6">
                  {blogItems.map((blog, idx) => (
                    <Blog {...blog} key={start + idx + 1} />
                  ))}
                </div>
              </div>
            );
          }
        )
      ) : searchText ? (
        <p className="text-center text-xl md:text-2xl text-gray-600 mt-12">
          No blogs found.
        </p>
      ) : null}
    </div>
  );
};

export default BlogsPage;
