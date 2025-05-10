import React from "react";

const CTA = () => {
  return (
    <div className="absolute -top-[58vw] md:-top-[8vw] left-1/2 -translate-x-1/2 bg-newBlue text-white w-11/12 md:w-[60vw] flex flex-col items-center justify-center py-7 rounded-xl">
      <h3 className="text-4xl text-center">Grow your skills with wtyd</h3>
      <p className="text-lg py-3 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </p>
      <button className="text-white bg-newYellow px-6 py-2 rounded-lg font-medium">
        Learn more
      </button>
    </div>
  );
};

export default CTA;
