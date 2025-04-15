import React from "react";
import Marquee from "@/components/Home/Marquee";
import FeedbackCard from "@/components/Home/FeedbackCard";

const Feedback = () => {
  const feedbacks = [
    {
      header: "Ava",
      subhead: "Designer",
      title: "Amazing Work!",
      subtitle: "UI/UX Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      header: "Ben",
      subhead: "Developer",
      title: "Highly Recommended",
      subtitle: "Web Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      header: "Chloe",
      subhead: "Marketing",
      title: "Great Results",
      subtitle: "Digital Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      header: "David",
      subhead: "Project Manager",
      title: "Excellent Communication",
      subtitle: "Project Management",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      header: "Eve",
      subhead: "Analyst",
      title: "Insightful Analysis",
      subtitle: "Data Analysis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      header: "Frank",
      subhead: "Tester",
      title: "Flawless Execution",
      subtitle: "Quality Assurance",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="bg-[#FAF8FF] py-[4vw] px-[3vw]">
      <h2 className="text-5xl font-semibold mb-[2vw]">Feedbacks</h2>
      <Marquee className="my-marquee" pauseOnHover repeat={2} reverse={true}>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} {...feedback} />
        ))}
      </Marquee>
    </div>
  );
};

export default Feedback;
