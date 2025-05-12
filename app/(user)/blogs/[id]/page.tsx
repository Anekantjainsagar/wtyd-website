"use client";
import VerticalBlog, { BlogType } from "@/components/Home/blogs/VerticalBlog";
import UserContext, { createMarkupText } from "@/context/UserContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Metadata } from "next";

interface BlogPageProps {
  params: {
    id: string;
  };
}

const BlogPageSingle = ({ params }: BlogPageProps) => {
  const { id } = params;
  const [blog, setBlog] = useState<BlogType>();
  const [loading, setLoading] = useState(true);
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Blogs must be used within a UserProvider");
  }

  const { blogs } = context;

  useEffect(() => {
    if (!blogs || blogs.length === 0) return;

    const temp = blogs.find(
      (e) => e?.title?.toLowerCase()?.replaceAll(" ", "-") === id
    );

    if (temp) {
      setBlog(temp);
    } else {
      toast.error("Blog not found.");
    }

    setLoading(false);
  }, [id, blogs]);

  if (loading) {
    return (
      <div className="pt-[22vw] md:pt-[8vw] flex justify-center items-center h-[50vh]">
        <p className="text-2xl font-semibold animate-pulse">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="pt-[22vw] md:pt-[8vw]">
      <h4 className="text-center text-3xl md:text-6xl font-bold mt-6 md:mb-0 mb-4">
        {blog?.title}
      </h4>
      <Image
        src={blog?.coverImage || ""}
        alt={blog?.title || "Blog Cover image"}
        width={1000}
        height={1000}
        className="md:w-7/12 w-[90vw] mx-auto rounded-xl my-0 md:my-8 object-cover"
      />
      <p
        className="md:px-0 px-[5vw] md:w-7/12 mx-auto py-4 mb-[3vw]"
        dangerouslySetInnerHTML={createMarkupText(blog?.content)}
      />
      <div className="bg-[#FAF8FF] px-[5vw] md:px-[3vw] py-[6vw] md:py-10">
        <h4 className="text-3xl md:text-4xl font-medium">Related Blogs</h4>
        <div className="flex md:flex-row flex-col items-center gap-6 md:gap-8 mt-5">
          {blogs?.map((e, idx) => (
            <VerticalBlog {...e} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPageSingle;
