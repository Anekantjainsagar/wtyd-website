import Image from "next/image";
import Link from "next/link";
import React from "react";

const VerticalBlog = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden p-5">
      <div className="w-full">
        <Image
          src={image}
          alt="Blog"
          width={1000}
          height={1000}
          className="w-full rounded-xl h-[32vh] object-cover"
        />
      </div>
      <div className="w-full pt-5 flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-semibold mb-2">{title}</h3>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        <Link href={"/blogs/1"}>
          <button className="mt-4 w-[7vw] bg-newBlue outline-none text-white py-2 rounded-md font-medium text-base">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerticalBlog;
