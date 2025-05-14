"use client";
import React, { useState } from "react";
import ProjectsView from "@/components/Projects/ProjectsView";
import InputSections from "@/sections/Blogs/InputSections";

const ProjectsPage = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className="pt-[18vw] md:pt-[6vw]">
      <InputSections setValue={setSearchText} />
      <ProjectsView searchText={searchText} />
    </div>
  );
};

export default ProjectsPage;
