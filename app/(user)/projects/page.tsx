import React from "react";
import InputSections from "@/sections/Projects/InputSections";
import ProjectsView from "@/components/Projects/ProjectsView";

const ProjectsPage = () => {
  return (
    <div className="pt-[18vw] md:pt-[6vw]">
      <InputSections />
      <ProjectsView />
    </div>
  );
};

export default ProjectsPage;
