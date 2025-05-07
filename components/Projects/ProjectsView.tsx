// app/projects/ProjectsView.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const projectData = [
  {
    tag: "WEB",
    title: "Relevant Projects on Web",
    description:
      "Offers a variety of courses to upskill learners in trending technologies. Provides recognized certificates to boost resumes.",
    image: "/assets/home/blog.png",
  },
  {
    tag: "WEB",
    title: "Relevant Projects on Web",
    description:
      "Offers a variety of courses to upskill learners in trending technologies. Provides recognized certificates to boost resumes.",
    image: "/assets/home/blog.png",
  },
  {
    tag: "WEB",
    title: "Relevant Projects on Web",
    description:
      "Offers a variety of courses to upskill learners in trending technologies. Provides recognized certificates to boost resumes.",
    image: "/assets/home/blog.png",
  },
  {
    tag: "App",
    title: "Relevant Projects on Web",
    description:
      "Offers a variety of courses to upskill learners in trending technologies. Provides recognized certificates to boost resumes.",
    image: "/assets/home/blog.png",
  },
  {
    tag: "App",
    title: "Relevant Projects on Web",
    description:
      "Offers a variety of courses to upskill learners in trending technologies. Provides recognized certificates to boost resumes.",
    image: "/assets/home/blog.png",
  },
  {
    tag: "App",
    title: "Relevant Projects on Web",
    description:
      "Offers a variety of courses to upskill learners in trending technologies. Provides recognized certificates to boost resumes.",
    image: "/assets/home/blog.png",
  },
];

const ProjectsView = () => {
  return (
    <div className="px-[5vw] md:px-[3vw] py-[3vw] bg-white">
      <h2 className="text-3xl md:text-5xl font-medium mb-6">Our Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="bg-[#FAF8FF] border border-gray-500/20 rounded-xl overflow-hidden shadow-xl cursor-pointer transition"
          >
            <div className="relative">
              <Image
                src={project.image}
                alt="Project Image"
                width={400}
                height={200}
                className="w-full h-[22vh] md:h-[35vh] object-cover"
              />
              <span className="absolute top-0 left-0 bg-white px-9 py-1.5 rounded-tl-xl rounded-br-xl shadow text-newGrey">
                {project.tag}
              </span>
            </div>

            <div className="p-4">
              <div className="flex gap-3 mb-[1.5vw]">
                <Link href={"/projects/1"}>
                  {" "}
                  <button className="text-white px-7 md:px-9 py-1 md:py-1.5 rounded-full text-lg font-medium bg-newBlue transition">
                    Explore
                  </button>
                </Link>
                <button className="border border-newBlue text-newBlue px-7 md:px-9 py-1 md:py-1.5 rounded-full text-lg font-medium hover:bg-blue-50 transition">
                  Join now
                </button>
              </div>
              <h3 className="font-semibold text-2xl text-gray-900 md:mt-0 mt-2">
                {project.title}
              </h3>
              <p className="text-lg text-newGrey mt-1 md:mt-2 pb-[1vw]">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
