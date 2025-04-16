import Popular from "@/components/Home/blogs/Popular";
import RecentBlog from "@/components/Home/blogs/RecentBlog";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <RecentBlog />
      <Popular />
    </div>
  );
};

export default Blogs;
