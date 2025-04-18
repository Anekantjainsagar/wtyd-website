import React from "react";
import { GoGitBranch } from "react-icons/go";

const Approach = () => {
  const approachSteps = [
    {
      title: "Discovery Phase",
      description:
        "We collaborate with you to understand your business, identify your needs, and define the scope of the project.",
      bgColor: "bg-[#2FAE44]/15",
    },
    {
      title: "Planning & Strategy",
      description:
        "Based on the discovery, we develop a detailed plan and strategy to achieve your goals effectively.",
      bgColor: "bg-[#0043C0]/15",
    },
    {
      title: "Design & Prototyping",
      description:
        "Our team creates intuitive and engaging UI's and prototypes for your review and feedback.",
      bgColor: "bg-[#2FAE44]/15",
    },
    {
      title: "Development",
      description:
        "Our skilled developers bring the designs to life, building robust and scalable solutions.",
      bgColor: "bg-[#0043C0]/15",
    },
    {
      title: "Testing & Quality Assurance",
      description:
        "We rigorously test the developed solution to ensure it meets the highest standards of quality and performance.",
      bgColor: "bg-[#2FAE44]/15",
    },
    {
      title: "Deployment & Support",
      description:
        "We handle the deployment process and provide ongoing support to ensure your solution runs smoothly.",
      bgColor: "bg-[#0043C0]/15",
    },
  ];

  return (
    <div className="py-[4vw] px-[3vw] bg-white">
      <h2 className="text-5xl font-semibold mb-[2.5vw] text-center">
        Our Approach
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {approachSteps.map((step, index) => (
          <div
            key={index}
            className={`${step.bgColor} rounded-lg shadow-md p-5 space-x-6 flex items-center`}
          >
            <div className="bg-newBlue text-6xl w-[18vw] h-[8vw] text-white flex items-center justify-center rounded-md p-3">
              <GoGitBranch />
            </div>
            <div>
              <h3 className={`text-2xl font-semibold text-black mb-2`}>
                {step.title}
              </h3>
              <p className="text-newGrey text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approach;
