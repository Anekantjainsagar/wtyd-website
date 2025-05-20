import React from "react";
import Marquee from "@/components/Home/Marquee";
import FeedbackCard from "@/components/Home/FeedbackCard";

const Feedback = () => {
  const feedbacks = [
    {
      header: "Aman",
      subhead: "Developer",
      title: "Highly Recommended",
      subtitle: "Web Development",
      description:
        "WTYD delivered a top-tier web application with clean code, intuitive design, and ahead of schedule. The team was incredibly responsive throughout the project.",
    },
    {
      header: "Sneha",
      subhead: "Marketing Specialist",
      title: "Great Results",
      subtitle: "Digital Marketing",
      description:
        "Their team revamped our entire digital strategy. The SEO improvements and ad performance were impressive—our conversions increased by 40% in just two months.",
    },
    {
      header: "Raghav",
      subhead: "Project Manager",
      title: "Excellent Communication",
      subtitle: "Project Management",
      description:
        "They followed Agile methodology strictly, kept us updated at every sprint, and handled feedback with professionalism. Truly a reliable tech partner.",
    },
    {
      header: "Kriti",
      subhead: "Data Analyst",
      title: "Insightful Analysis",
      subtitle: "Data Analytics",
      description:
        "WTYD’s data team helped us uncover critical business insights that we hadn’t even thought of. Their dashboard solutions were exactly what we needed.",
    },
    {
      header: "Arjun",
      subhead: "Startup Founder",
      title: "Perfect MVP Delivery",
      subtitle: "Product Development",
      description:
        "They built our MVP within 4 weeks and integrated all core features without compromising quality. It gave us a strong base to pitch to investors.",
    },
    {
      header: "Ishita",
      subhead: "UI/UX Designer",
      title: "Stunning Design Work",
      subtitle: "UI/UX Design",
      description:
        "The design process was smooth and collaborative. The team understood our brand voice and delivered a beautiful, user-friendly interface.",
    },
    {
      header: "Vikram",
      subhead: "Business Owner",
      title: "Efficient & Affordable",
      subtitle: "Mobile App Development",
      description:
        "They developed a scalable app for our business operations. The app was lightweight, fast, and came with detailed documentation.",
    },
    {
      header: "Neha",
      subhead: "HR Manager",
      title: "Professional Training Modules",
      subtitle: "Corporate Training",
      description:
        "Our employees learned practical coding skills through WTYD’s training program. Feedback from the team has been overwhelmingly positive.",
    },
    {
      header: "Karan",
      subhead: "E-commerce Manager",
      title: "Robust Backend Development",
      subtitle: "API & Backend Services",
      description:
        "WTYD's backend team built a stable and secure architecture for our online store, ensuring smooth performance during high-traffic hours.",
    },
    {
      header: "Priya",
      subhead: "Software Tester",
      title: "Smooth QA Process",
      subtitle: "Quality Assurance",
      description:
        "They took QA seriously—every bug we reported was fixed in no time. The final product was well-tested, polished, and ready to deploy.",
    },
  ];
  

  return (
    <div className="bg-[#FAF8FF] py-[10vw] md:py-[4vw] px-[5vw] md:px-[3vw]">
      <h2 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-5">
        What Our Clients Say
      </h2>
      <p className="text-lg md:text-2xl text-newGrey mt-2 mb-[2.5vw] md:text-start text-center">
        Hear from founders, designers, and project managers who&apos;ve trusted
        WTYD to deliver real results through innovative tech solutions.
      </p>
      <Marquee className="my-marquee" pauseOnHover repeat={2} reverse={true}>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} {...feedback} />
        ))}
      </Marquee>
    </div>
  );
};

export default Feedback;
