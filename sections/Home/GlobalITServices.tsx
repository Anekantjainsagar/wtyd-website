import React from "react";

const GlobalITServices = () => {
  return (
    <div className="bg-white pt-[10vw] md:pt-[5vw] pb-[10vw] md:pb-0 pr-[5vw] md:pr-[3vw] pl-[5vw] md:pl-0">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="md:w-1/2">
          <img
            src="/assets/home/global-it-service.png"
            alt="Global IT Services"
            className="w-full"
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left h-full">
          <h2 className="text-3xl md:text-5xl font-medium text-black mb-2 md:mb-4">
            Global IT Services
          </h2>
          <p className="text-newGrey md:text-xl mb-5 md:mb-8 tracking-wide md:w-11/12">
            We cater to global clients, adapting to cultural and market needs.
            From iOS app development in Canada to web solutions in Germany and
            custom software in the UAE, we deliver tailored services worldwide.
          </p>
          <div className="bg-newBlue text-white md:text-lg font-medium py-2 px-6 rounded-md inline-block cursor-pointer">
            Learn more
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalITServices;
