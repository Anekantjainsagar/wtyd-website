"use client";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import API_URI, { ACTUAL_URI } from "@/utils/url";
import axios from "axios";
import Link from "next/link";
import Select from "../../Components/Utils/Select";
import AdminContext from "@/context/AdminContext";
import { IoReload } from "react-icons/io5";
import { useConfirm } from "../../Components/Utils/ConfirmProvier";

const Blogs = () => {
  const [spinning, setSpinning] = useState(false);
  const { getBlogs, blogs } = useContext(AdminContext);
  const [sortStore, setSortStore] = useState("Sort By");

  const handleReload = async () => {
    setSpinning(true);
    await getBlogs();
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[90vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold text-2xl">All Blogs ({blogs?.length})</p>
          <div className="gap-x-4 flex items-center">
            <IoReload
              title="Refresh Data"
              className={`text-xl cursor-pointer transition-transform ${
                spinning ? "animate-spin" : ""
              }`}
              onClick={handleReload}
            />
            <Select
              value={sortStore}
              onChange={(e) => setSortStore(e.target.value)}
              options={["Sort By", "Ascending", "Descending"]}
            />
          </div>
        </div>
        <div className="px-2 pt-2">
          {blogs
            ?.sort((a, b) => {
              if (sortStore === "Descending") {
                let fa = a?.title?.toLowerCase(),
                  fb = b?.title?.toLowerCase();

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              } else if (sortStore == "Ascending") {
                let fa = a?.title?.toLowerCase(),
                  fb = b?.title?.toLowerCase();

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              } else if (sortStore === "Oldest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);
                console.log(fa, fb);

                return fb - fa;
              } else if (sortStore === "Newest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fa - fb;
              }
              return 0;
            })
            .map((e, i) => {
              return <Product data={e} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Product = ({ data }) => {
  const history = useRouter();
  const [statusVal, setStatusVal] = useState("");
  const { requestConfirm } = useConfirm();
  const { blogs, setBlogs } = useContext(AdminContext);

  function createMarkup() {
    return { __html: data?.content?.slice(0, 150) + "..." };
  }

  const handleDelete = () => {
    requestConfirm(`Are you sure you want to delete ${data?.title}?`, () => {
      axios
        .delete(`${API_URI}/api/v1/admin/blogs/delete/${data?._id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setBlogs(blogs?.filter((blog) => blog?._id != data?._id));
            toast.success("Deleted successfully");
          }
        });
    });
  };

  useEffect(() => {
    setStatusVal(data?.status);
  }, [data]);

  return (
    <div className="rounded-md flex items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex w-[68vw] items-center justify-start">
        <Image
          src={data?.coverImage}
          width={100}
          height={100}
          alt="Image"
          className="w-2/12 h-[14vh] rounded-md object-cover object-center"
        />
        <div className="py-1 w-9/12 ml-3">
          <p className="text-black text-xl font-bold">{data?.title}</p>
          <div className="mx-0 px-0" dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
      <div className="flex items-center">
        <Select
          value={statusVal}
          onChange={(e) => {
            setStatusVal(e.target.value);
            axios.put(
              `${API_URI}/api/v1/admin/blogs/update/${data?._id}`,
              { ...data, status: e.target.value },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              }
            );
            toast.success(`${data?.title} status updated to ${e.target.value}`);
          }}
          options={["pending", "uploaded", "rejected"]}
        />
        <Link
          href={`${ACTUAL_URI}/blogs/${data?.title
            ?.toLowerCase()
            ?.replaceAll(" ", "-")
            .replaceAll(",", "")
            .replaceAll(":", "")
            .replaceAll(";", "")
            .replaceAll("'", "")}`}
          target="_blank"
        >
          <AiOutlineEye
            className="text-oceanGreen bg-lightOceanGreen p-2 rounded-full hover:text-white hover:bg-oceanGreen transition-all mr-3"
            size={35}
          />
        </Link>
        <AiOutlineEdit
          className="text-blue-500 bg-blue-50 p-2 rounded-full hover:text-white hover:bg-blue-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            history.push(
              `/admin/blogs/${data?.title
                ?.toLowerCase()
                ?.replaceAll(" ", "-")
                .replaceAll(",", "")
                .replaceAll(":", "")
                .replaceAll(";", "")}`
            );
          }}
        />
        <AiOutlineDelete
          className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            handleDelete(data);
          }}
        />
      </div>
    </div>
  );
};

export default Blogs;
