import Image from "next/image";
import React from "react";

interface FeatureItem {
  title: string;
  description: string;
  imageUrl: string;
}

const WhyUs = () => {
  const features: FeatureItem[] = [
    {
      title: "Skill Enhancement",
      description:
        "Offers a variety of courses to upskill learners in trending technologies.",
      imageUrl: "/assets/home/02_why/1.png",
    },
    {
      title: "Flexible Learning",
      description:
        "Self-paced and instructor-led options for different learning styles.",
      imageUrl: "/assets/home/02_why/2.png",
    },
    {
      title: "Relevant Projects",
      description: "Engage in real-world projects that enhance your portfolio.",
      imageUrl: "/assets/home/02_why/3.png",
    },
  ];

  return (
    <div className="bg-[#FAF8FF] py-[10vw] md:py-[5vw] px-[5vw] md:px-[3vw]">
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-newBlue mb-2">
          Why Choose wtyd?
        </h2>
        <p className="text-newGrey md:text-xl mt-1 md:mt-2 md:w-10/12">
          A Tech Partner That Understands Growth - From strategic consulting to
          final deployment, we deliver technology solutions that align with your
          business goals and scale with your vision.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl cursor-pointer p-5"
          >
            <Image
              width={1000}
              height={1000}
              src={feature.imageUrl}
              alt={feature.title}
              className="h-[30vw] md:h-[8vw] w-fit object-contain"
            />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-newGrey md:text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
