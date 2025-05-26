"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserContext, {
  createMarkupText,
  ProjectType,
} from "@/context/UserContext";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

const ProductView = () => {
  const params = useParams();
  const id = params?.id as string;
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Initially true
  const [project, setProject] = useState<ProjectType>();

  if (!context) {
    throw new Error("Projects must be used within a UserProvider");
  }

  const { projects } = context;

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const temp = projects.find(
      (e) =>
        e?.title
          ?.toLowerCase()
          ?.replaceAll(" ", "-")
          .replaceAll(",", "")
          .replaceAll(":", "")
          .replaceAll(";", "")
          .replaceAll("'", "") === id
    );

    if (temp) {
      setProject(temp);
    } else {
      toast.error("Project not found.");
    }

    setLoading(false); // Done loading
  }, [id, projects]);

  if (loading) {
    return (
      <div className="pt-[22vw] md:pt-[8vw] flex justify-center items-center h-[50vh]">
        <p className="text-2xl font-semibold animate-pulse text-newBlue">
          Loading project...
        </p>
      </div>
    );
  }

  return (
    <div className="px-[5vw] md:px-[3vw] pb-[4vw] pt-[24vw] md:pt-[8vw] bg-white text-gray-800">
      {/* Top Section */}
      <div className="bg-newBlue text-white rounded-xl p-4 md:p-10 flex flex-col md:flex-row gap-3 md:gap-6 items-center relative">
        <Link
          href="/projects"
          className="hidden md:inline-block absolute top-6 left-6 text-lg font-medium text-blue-600 bg-white px-6 py-2.5 rounded-md transition"
        >
          Back to projects
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-2">
            {project?.title}
          </h1>
          <p className="text-base md:text-xl md:w-9/12 md:mt-2.5">
            {project?.category}
          </p>
        </div>
        <div className="w-full md:w-1/2">
          {project?.image && (
            <Image
              src={project?.image}
              alt={project?.title || ""}
              width={1000}
              height={1000}
              className="rounded-md h-[25vh] md:h-[45vh] object-cover"
            />
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-semibold mt-6 md:mt-10 text-newBlue">
        {project?.title}
      </h2>

      {/* Description */}
      <div
        className="mt-2 md:mt-4 text-gray-700 leading-relaxed md:text-xl space-y-4"
        dangerouslySetInnerHTML={createMarkupText(project?.desc)}
      />
    </div>
  );
};

export default ProductView;
