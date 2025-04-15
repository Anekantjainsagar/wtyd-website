import React from "react";

import WhyUs from "@/sections/Home/WhyUs";
import Courses from "@/sections/Home/Courses";
import SoftSolutions from "@/sections/Home/SoftSolutions";
import LandingSection from "@/sections/Home/LandingSection";
import CompaniesSection from "@/sections/Home/CompaniesSection";
import GlobalITServices from "@/sections/Home/GlobalITServices";
import InsightNumbers, { CounterItem } from "@/sections/Home/InsightNumbers";
import Feedback from "@/sections/Home/Feedback";
import Approach from "@/sections/Home/Approach";

const counters: CounterItem[] = [
  { endValue: 4000, label: "Total courses" },
  { endValue: 5000, label: "Expert mentors" },
  { endValue: 9000, label: "Total students" },
];

const coursesData = [
  { name: "Node JS", imageSrc: "/assets/home/course.png" },
  { name: "Flutter", imageSrc: "/assets/home/course.png" },
  { name: "Android Studio", imageSrc: "/assets/home/course.png" },
  { name: "Node JS", imageSrc: "/assets/home/course.png" },
  { name: "Node JS", imageSrc: "/assets/home/course.png" },
  { name: "Node JS", imageSrc: "/assets/home/course.png" },
];

const Home = () => {
  return (
    <div className="">
      <LandingSection />
      <CompaniesSection />
      <WhyUs />
      <GlobalITServices />
      <InsightNumbers counters={counters} />
      <SoftSolutions />
      <Courses courses={coursesData} />
      <Approach />
      <Feedback />
    </div>
  );
};

export default Home;
