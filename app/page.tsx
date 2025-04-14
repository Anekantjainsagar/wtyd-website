import React from "react";

import WhyUs from "@/sections/Home/WhyUs";
import LandingSection from "@/sections/Home/LandingSection";
import CompaniesSection from "@/sections/Home/CompaniesSection";
import GlobalITServices from "@/sections/Home/GlobalITServices";
import InsightNumbers, { CounterItem } from "@/sections/Home/InsightNumbers";
import SoftSolutions from "@/sections/Home/SoftSolutions";

const counters: CounterItem[] = [
  { endValue: 4000, label: "Total courses" },
  { endValue: 5000, label: "Expert mentors" },
  { endValue: 9000, label: "Total students" },
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
    </div>
  );
};

export default Home;
