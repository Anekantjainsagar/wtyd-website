import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogType } from "./VerticalBlog";
import { createMarkupText } from "@/context/UserContext";

const Blog = ({ coverImage, title, content }: BlogType) => {
  return (
    <div className="flex md:flex-row flex-col bg-white rounded-xl shadow-md overflow-hidden p-3 md:p-5">
      <div className="md:w-5/12">
        <Image
          src={coverImage}
          alt={title}
          width={1000}
          height={1000}
          className="w-full rounded-xl h-[22vh] object-cover"
        />
      </div>
      <div className="md:w-7/12 md:mt-0 mt-4 p-0 md:p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h3>
          <p
            className="md:text-lg text-gray-600 line-clamp-1"
            dangerouslySetInnerHTML={createMarkupText(
              content?.slice(0, 150) + "..."
            )}
          />{" "}
        </div>{" "}
        <Link
          href={`/blogs/${title
            ?.toLowerCase()
            ?.replaceAll(" ", "-")
            .replaceAll(",", "")
            .replaceAll(":", "")
            .replaceAll(";", "")
            .replaceAll("'", "")}`}
        >
          <button className="mt-4 w-full md:w-[7vw] bg-newBlue outline-none text-white py-2 rounded-md font-medium text-base">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
