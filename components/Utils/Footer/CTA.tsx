import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <div className="absolute -top-[58vw] md:-top-[8vw] left-1/2 -translate-x-1/2 bg-newBlue text-white md:px-0 px-4 w-[90vw] md:w-[60vw] flex flex-col items-center justify-center py-7 rounded-xl">
      <h3 className="text-3xl md:text-4xl text-center">Ready to Start Your Project?</h3>
      <p className="md:text-lg py-3 text-center">
        From beginner to pro - We help you build a career, not just code
      </p>
      <Link href="/contact">
        <button className="text-white bg-newYellow px-8 md:px-6 py-2 rounded-lg font-medium">
          Learn more
        </button>
      </Link>
    </div>
  );
};

export default CTA;
