import React from "react";
import Blog from "./Blog";

export type BlogStatus = "Pending" | "Uploaded" | "Rejected";

export interface BlogStruct {
  id: number;
  title: string;
  date: string;
  status: BlogStatus;
  image: string;
}

const blogs: BlogStruct[] = [
  {
    id: 1,
    title: "General IoT",
    date: "12/04/2025",
    status: "Pending",
    image: "/assets/home/blog.png",
  },
  {
    id: 2,
    title: "General IoT",
    date: "12/04/2025",
    status: "Uploaded",
    image: "/assets/home/blog.png",
  },
  {
    id: 3,
    title: "General IoT",
    date: "12/04/2025",
    status: "Rejected",
    image: "/assets/home/blog.png",
  },
  {
    id: 4,
    title: "General IoT",
    date: "12/04/2025",
    status: "Pending",
    image: "/assets/home/blog.png",
  },
];

const BlogsDashboard = () => {
  return (
    <div className="px-[5vw] md:px-[3vw] py-[4vw]">
      <h3 className="text-blue-700 text-3xl md:text-4xl font-semibold mb-3 md:mb-8">
        Blogs Dashboard
      </h3>

      <div className="grid gap-6">
        {blogs.map((blog, idx) => (
          <Blog key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsDashboard;
