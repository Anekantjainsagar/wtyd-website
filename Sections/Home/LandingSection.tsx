import Image from "next/image";
import React from "react";

const LandingSection = () => {
  return (
    <div className="h-[100vh] flex items-center justify-between bg-newBlue w-full px-[3vw]">
      <div className="text-white">
        <p className="text-2xl">Wtyd - We Tech Your Dreams</p>
        <h2 className="text-6xl font-extrabold w-7/12 leading-snug my-10">
          Learn. Build. Succeed. - Your Tech Journey Starts Here!
        </h2>
        <div className="">
          <button className="px-6 py-2 text-newBlue border-2 border-white bg-white rounded-md text-xl font-medium">
            Get Started
          </button>
          <button className="ml-5 px-6 py-2 text-white border-2 border-white rounded-md text-xl font-medium">
            Learn more
          </button>
        </div>
      </div>
      <div className="w-[52vw] flex flex-col items-end justify-end absolute right-0 bottom-0">
        <Image
          width={10000}
          height={10000}
          src="/assets/home/landing-img.png"
          alt="We Tech You Dream Landing Image"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LandingSection;
