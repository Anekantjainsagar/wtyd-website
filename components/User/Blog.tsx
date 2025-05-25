import axios from "axios";
import Image from "next/image";
import API_URI from "@/utils/url";
import toast from "react-hot-toast";
import UpdateBlog from "./UpdateBlog";
import { GoPencil } from "react-icons/go";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookies";
import { AiOutlineEye } from "react-icons/ai";
import { BlogStatus } from "./BlogsDashboard";
import UserContext from "@/context/UserContext";
import { MdOutlineDelete } from "react-icons/md";
import React, { useContext, useState } from "react";
import { BlogType } from "../Home/blogs/VerticalBlog";
import { useConfirm } from "@/app/(admin)/Components/Utils/ConfirmProvier";

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

const getButtonClasses = () => {
  const common =
    "px-6 md:px-7 py-2.5 flex items-center gap-x-2.5 rounded-full text-white font-semibold md:text-lg";
  return `${common} bg-newBlue hover:bg-newBlue/80`;
};

const Blog = ({ blog }: { blog: BlogType }) => {
  const router = useRouter();
  const { requestConfirm } = useConfirm();
  const context = useContext(UserContext);
  const [selectedBlog, setSelectedBlog] = useState<BlogType>();
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  if (!context) {
    throw new Error("Blogs must be used within a UserProvider");
  }

  const { setMyBlogs, myBlogs } = context;

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
    <div
      className="bg-white relative flex md:grid shadow-md rounded-xl p-3 md:p-4 md:flex-row flex-col items-center justify-between"
      style={{ gridTemplateColumns: "40% 25% 35%" }}
    >
      <UpdateBlog
        isOpen={isModalOpenUpdate}
        onClose={() => setIsModalOpenUpdate(false)}
        data={selectedBlog}
      />
      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-6">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          width={1000}
          height={1000}
          className="rounded-xl md:w-[20vw] w-full object-cover"
        />
        <div className="w-full">
          <p className="font-medium text-start text-2xl md:text-3xl w-full">
            {blog.title?.slice(0, 20) + (blog?.title?.length > 20 ? "..." : "")}
          </p>
          <p className="text-gray-600 text-lg mt-1 md:mt-2">
            {new Date(blog.createdAt).toString().slice(4, 16)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center md:mt-0 mt-1">
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
      </div>

      <div className="flex flex-col md:flex-row items-center justify-end gap-3 md:gap-5 md:mt-0 mt-3 w-full md:w-auto">
        {blog?.status === "uploaded" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push(
                `/blogs/${blog?.title
                  ?.toLowerCase()
                  ?.replaceAll(" ", "-")
                  .replaceAll(",", "")
                  .replaceAll(":", "")
                  .replaceAll(";", "")}`
              );
            }}
            className="w-full md:w-auto px-4 md:px-7 py-2 flex items-center justify-center gap-x-2 rounded-full bg-green-600 text-white font-semibold text-sm md:text-lg hover:bg-green-700"
          >
            <AiOutlineEye className="text-base md:text-2xl" /> View Blog
          </button>
        )}
        <button
          className={`w-full md:w-auto px-4 md:px-7 py-2 flex items-center justify-center gap-x-2 rounded-full text-white font-semibold text-sm md:text-lg bg-newBlue hover:bg-newBlue/80`}
          onClick={() => {
            setIsModalOpenUpdate(true);
            setSelectedBlog(blog);
          }}
        >
          <GoPencil className="text-base md:text-xl" /> Edit Blog
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleDelete(blog);
          }}
          className="w-full md:w-auto px-4 md:px-7 py-2 flex items-center justify-center gap-x-2 rounded-full bg-red-600 text-white font-semibold text-sm md:text-lg hover:bg-red-700"
        >
          <MdOutlineDelete className="text-base md:text-2xl" /> Delete Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
