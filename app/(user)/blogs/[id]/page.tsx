import VerticalBlog from "@/components/Home/blogs/VerticalBlog";
import Image from "next/image";
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
  {
    title: "General IoT",
    description:
      "These blogs cover a broad range of IoT-related news, instructional guides and other content.",
    image: "/assets/home/blog.png",
  },
];

const BlogPageSingle = () => {
  return (
    <div className="pt-[22vw] md:pt-[8vw]">
      <h4 className="text-center text-3xl md:text-6xl font-bold mt-6 md:mb-0 mb-4">
        Nvidia GTC Sets Bold AI Vision
      </h4>
      <Image
        src={"/assets/home/blog.png"}
        alt="Blog"
        width={1000}
        height={1000}
        className="md:w-7/12 w-[90vw] mx-auto rounded-xl my-0 md:my-8 object-cover"
      />
      <NvidiaGTCSummary />
      <div className="bg-[#FAF8FF] px-[5vw] md:px-[3vw] py-[6vw] md:py-10">
        <h4 className="text-3xl md:text-4xl font-medium">Related Blogs</h4>
        <div className="flex md:flex-row flex-col items-center gap-6 md:gap-8 mt-5">
          {blogs?.map((e, idx) => {
            return <VerticalBlog {...e} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

const NvidiaGTCSummary = () => {
  return (
    <div className="md:px-0 px-[5vw] md:w-7/12 mx-auto py-4 mb-[3vw]">
      <p className="text-xl text-gray-700 mb-6">
        At NVIDIA&apos;s GTC 2025 conference, CEO Jensen Huang unveiled a
        comprehensive vision for the future of artificial intelligence,
        emphasizing advancements in hardware, software, and AI applications
        across various industries. Here are the key highlights:
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          1. Next-Generation AI Hardware
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2 text-xl">
            <span className="font-medium">Blackwell Ultra GPU:</span> Introduced
            as a significant upgrade, offering 1.5 times more computational
            power than its predecessor, the standard Blackwell GPU.{" "}
          </li>
          <li className="text-xl">
            <span className="font-medium">
              Vera Rubin and Feynman Architectures:
            </span>{" "}
            Announced as future chip architectures, with Vera Rubin expected in
            2026 and Feynman in 2027, aiming to further enhance AI processing
            capabilities.{" "}
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          2. Next-Generation AI Hardware
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2 text-xl">
            <span className="font-medium">Blackwell Ultra GPU:</span> Introduced
            as a significant upgrade, offering 1.5 times more computational
            power than its predecessor, the standard Blackwell GPU.{" "}
          </li>
          <li className="text-xl">
            <span className="font-medium">
              Vera Rubin and Feynman Architectures:
            </span>{" "}
            Announced as future chip architectures, with Vera Rubin expected in
            2026 and Feynman in 2027, aiming to further enhance AI processing
            capabilities.{" "}
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          3. Next-Generation AI Hardware
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2 text-xl">
            <span className="font-medium">Blackwell Ultra GPU:</span> Introduced
            as a significant upgrade, offering 1.5 times more computational
            power than its predecessor, the standard Blackwell GPU.{" "}
          </li>
          <li className="text-xl">
            <span className="font-medium">
              Vera Rubin and Feynman Architectures:
            </span>{" "}
            Announced as future chip architectures, with Vera Rubin expected in
            2026 and Feynman in 2027, aiming to further enhance AI processing
            capabilities.{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogPageSingle;
