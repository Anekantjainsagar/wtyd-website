import React from "react";

const CTA = () => {
  return (
    <div className="absolute -top-[8vw] left-1/2 -translate-x-1/2 bg-newBlue text-white w-[60vw] flex flex-col items-center justify-center py-7 rounded-xl">
      <h3 className="text-4xl">Grow your skills with wtyd</h3>
      <p className="text-lg py-3">
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
