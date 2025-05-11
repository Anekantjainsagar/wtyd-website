import Blog from "@/components/Home/blogs/Blog";
import RecentBlog from "@/components/Home/blogs/RecentBlog";
import VerticalBlog from "@/components/Home/blogs/VerticalBlog";
import InputSections from "@/sections/Blogs/InputSections";
import React from "react";

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
];

const BlogsPage = () => {
  return (
    <div className="pt-[18vw] md:pt-[6vw]">
      <InputSections />
      <h4 className="px-[5vw] md:px-[3vw] text-3xl md:text-6xl font-medium mt-6">
        Blogs
      </h4>
      <RecentBlog />
      <div className="px-[5vw] md:px-[3vw] flex md:flex-row flex-col items-center md:space-y-0 space-y-6">
        <div className="md:w-5/12 md:pr-6">
          <VerticalBlog {...blogs[0]} />
        </div>
        <div className="md:w-7/12 space-y-6">
          {blogs?.map((e, idx) => {
            return <Blog {...e} key={idx} />;
          })}
        </div>
      </div>
      <div className="px-[5vw] md:px-[3vw] flex md:flex-row flex-col items-center md:space-y-0 space-y-6 md:mt-0 mt-6">
        <div className="md:w-5/12 md:pr-6">
          <VerticalBlog {...blogs[0]} />
        </div>
        <div className="md:w-7/12 space-y-6">
          {blogs?.map((e, idx) => {
            return <Blog {...e} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
