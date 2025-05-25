import React from "react";
import { GoGitBranch } from "react-icons/go";

const Approach = () => {
  const approachSteps = [
    {
      title: "Discovery Phase",
      description:
        "Collaborate to understand your business, identify needs, and define project scope.",
      bgColor: "bg-[#2FAE44]/15",
    },
    {
      title: "Planning & Strategy",
      description:
        "Develop a detailed plan and strategy to achieve your goals effectively.",
      bgColor: "bg-[#0043C0]/15",
    },
    {
      title: "Design & Prototyping",
      description:
        "Create intuitive and engaging UI/UX designs and prototypes for feedback.",
      bgColor: "bg-[#2FAE44]/15",
    },
    {
      title: "Development",
      description:
        "Build robust and scalable solutions with our skilled developers.",
      bgColor: "bg-[#0043C0]/15",
    },
    {
      title: "Testing & Quality Assurance",
      description:
        "Rigorously test to ensure the highest standards of quality and performance.",
      bgColor: "bg-[#2FAE44]/15",
    },
    {
      title: "Deployment & Support",
      description:
        "Handle deployment and provide ongoing support for smooth operation.",
      bgColor: "bg-[#0043C0]/15",
    },
  ];

  return (
    <div className="py-[10vw] md:py-[4vw] px-[5vw] md:px-[3vw] bg-white">
      <h2 className="text-3xl md:text-5xl text-center md:text-start font-semibold mb-2 md:mb-5" id="approach">
        Structured Process, Measurable Results
      </h2>
      <p className="text-lg md:text-2xl text-newGrey mt-2 mb-[2.5vw] md:text-start text-center">
        We follow a well-defined approach—from discovery and design to
        development and deployment—to ensure quality and alignment at every
        step.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6 md:mt-0 mt-6">
        {approachSteps.map((step, index) => (
          <div
            key={index}
            className={`${step.bgColor} rounded-lg shadow-md p-3 md:p-5 space-x-6 flex items-start md:items-center`}
          >
            <div className="bg-newBlue text-6xl w-[20vw] md:w-4/12 h-[20vw] md:h-[8vw] text-white flex items-center justify-center rounded-md p-3">
              <GoGitBranch />
            </div>
            <div className="md:w-8/12">
              <h3
                className={`text-xl md:text-2xl font-semibold text-black mb-1 md:mb-2`}
              >
                {step.title}
              </h3>
              <p className="text-newGrey md:text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approach;
