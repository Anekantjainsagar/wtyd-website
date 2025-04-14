import React from "react";

const SoftSolutions = () => {
  return (
    <div className="bg-white pt-[5vw] pl-[3vw]">
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
        <div className="md:w-1/2">
          <img
            src="/assets/home/international-software-solutions.png"
            alt="International Software Solutions"
            className="w-full"
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left h-full">
          <h2 className="text-5xl font-medium text-black mb-4">
            International Software Solutions
          </h2>
          <p className="text-newGrey text-xl mb-8 tracking-wide w-11/12">
            Our international software solutions are designed to cater to
            businesses of all sizes, from startups to large enterprises. We
            provide end-to-end IT solutions that help you streamline operations,
            improve customer engagement, and drive growth in your business.
          </p>
          <div className="bg-newBlue text-white text-lg font-medium py-2 px-6 rounded-md inline-block cursor-pointer">
            Learn more
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftSolutions;
