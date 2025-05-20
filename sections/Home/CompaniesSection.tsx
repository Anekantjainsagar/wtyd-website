import Image from "next/image";
import React from "react";

const CompaniesSection = () => {
  return (
    <div className="flex md:flex-row flex-col md:items-center px-[5vw] md:px-[3vw] justify-between w-full py-8 md:py-7">
      <p className="text-newGrey md:w-2/12 text-lg md:text-xl">
        Backed by 100+ Global Businesses
      </p>
      <div className="h-[90px] w-[1px] bg-newGrey md:block hidden"></div>
      <div className="flex items-center justify-between md:w-9/12 md:mt-0 mt-4">
        {[
          "image (1).png",
          "image (2).png",
          "image (3).png",
          "image (4).png",
          "image (5).png",
          "image (6).png",
          "image (7).png",
        ]?.map((img, idx) => {
          return (
            <Image
              key={idx}
              width={10000}
              height={10000}
              alt="Companies Logo"
              src={"/assets/home/01_companies/" + img}
              className="w-[8vw] md:w-[4.25vw]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default CompaniesSection;
