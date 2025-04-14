import Image from "next/image";
import React from "react";

const CompaniesSection = () => {
  return (
    <div className="flex items-center px-[3vw] justify-between w-full py-7">
      <p className="text-newGrey w-2/12 text-xl">
        Trusted by 100+ company Worldwide
      </p>
      <div className="h-[90px] w-[1px] bg-newGrey"></div>
      <div className="flex items-center justify-between w-9/12">
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
              className="w-[4.25vw]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default CompaniesSection;
