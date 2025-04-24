"use client";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import API_URI from "@/utils/url";
import axios from "axios";
import Link from "next/link";

const Blogs = () => {
  const [sortStore, setSortStore] = useState("Sort By");
  const { blogs } = { blogs: [] };
  const history = useRouter();

  useEffect(() => {
    if (!getCookie("admin_token")) {
      history.push("/user/login");
    }
  }, [history]);

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[82vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold">All Blogs ({blogs?.length})</p>
          <div>
            <select
              value={sortStore}
              onChange={(e) => {
                setSortStore(e.target.value);
              }}
              className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
            >
              {["Sort By", "Newest", "Oldest", "Ascending", "Descending"].map(
                (e, i) => {
                  return (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  );
                }
              )}
            </select>
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
  const { getBlogs } = useContext(Context);

  function createMarkup() {
    return { __html: data?.description?.slice(0, 150) + "..." };
  }

  return (
    <div className="rounded-md flex items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex w-[68vw] items-center justify-between">
        <Image
          src={data?.image}
          width={100}
          height={100}
          alt="Image"
          className="w-2/12 h-[14vh] rounded-md object-cover object-center"
        />
        <div className="py-1 w-10/12 ml-3">
          <p className="text-black text-xl font-bold">{data?.title}</p>
          <div className="mx-0 px-0" dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
      <div className="flex items-center">
        <Link
          href={`https://trubuddies.com/blogs/${data?._id}`}
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
            history.push(`/admin/blogs/${data?._id}`);
          }}
        />
        <AiOutlineDelete
          className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            axios
              .post(`${API_URI}/admin/delete-blog/${data?._id}`)
              .then((res) => {
                if (res.status === 200 && res.data.deletedCount > 0) {
                  getBlogs();
                  toast.success("Deleted successfully");
                }
              });
          }}
        />
      </div>
    </div>
  );
};

export default Blogs;
