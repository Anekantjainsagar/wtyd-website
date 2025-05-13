import React, { useContext } from "react";
import Image from "next/image";
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { BlogStatus } from "./BlogsDashboard";
import { BlogType } from "../Home/blogs/VerticalBlog";
import axios from "axios";
import API_URI from "@/utils/url";
import { getCookie } from "@/utils/cookies";
import { useConfirm } from "@/app/(admin)/Components/Utils/ConfirmProvier";
import UserContext from "@/context/UserContext";
import toast from "react-hot-toast";

const getStatusColor = (status: BlogStatus) => {
  switch (status) {
    case "pending":
      return "text-blue-600 bg-blue-600";
    case "uploaded":
      return "text-green-600 bg-green-600";
    case "rejected":
      return "text-red-600 bg-red-600";
    default:
      return "";
  }
};

const getButtonClasses = (status: BlogStatus) => {
  const common =
    "px-7 md:px-8 py-2.5 flex items-center gap-x-2.5 rounded-full text-white font-semibold md:text-lg";
  if (status === "pending") return `${common} bg-blue-600 hover:bg-blue-700`;
  return `${common} bg-gray-400 cursor-not-allowed`;
};

const Blog = ({ blog }: { blog: BlogType }) => {
  const { requestConfirm } = useConfirm();
  const { setMyBlogs, myBlogs } = useContext(UserContext);

  const handleDelete = (blog: BlogType) => {
    requestConfirm(`Are you sure you want to delete ${blog?.title}?`, () => {
      console.log("Deleting");
      axios
        .delete(`${API_URI}/api/v1/users/my-blogs/${blog?._id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            setMyBlogs(
              myBlogs?.filter((temp: BlogType) => temp?._id != blog?._id)
            );
            toast.success("Deleted successfully");
          }
        });
    });
  };

  return (
    <div className="bg-white relative shadow-md rounded-xl p-4 flex md:flex-row flex-col items-center justify-between">
      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-6">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          width={1000}
          height={1000}
          className="rounded-xl md:w-[20vw] md:h-[10vw] object-cover"
        />
        <div className="w-full">
          <p className="font-medium text-start text-2xl md:text-3xl w-full">
            {blog.title}
          </p>
          <p className="text-gray-600 text-lg mt-1.5 md:mt-2">
            {new Date(blog.createdAt).toString().slice(4, 16)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-2.5 md:static absolute top-6 right-6 bg-white md:border-0 border border-gray-300 md:rounded-none rounded-full md:py-0 py-1 md:px-0 px-2">
        <span
          className={`w-2 md:w-4 h-2 md:h-4 rounded-full ${getStatusColor(
            blog.status
          )}`}
        ></span>
        <span className="text-sm md:text-xl md:font-medium capitalize">
          {blog.status}
        </span>
      </div>

      <div className="flex items-center gap-4 md:gap-10 md:mt-0 mt-3">
        <button className={getButtonClasses(blog.status)}>
          <GoPencil className="md:text-xl" /> Edit Blog
        </button>

        <button
          onClick={(e) => {
            handleDelete(blog);
          }}
          className="px-7 md:px-8 py-2.5 flex items-center gap-x-2.5 rounded-full bg-red-600 text-white font-semibold md:text-lg hover:bg-red-700"
        >
          <MdOutlineDelete className="text-lg md:text-2xl" /> Delete Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
