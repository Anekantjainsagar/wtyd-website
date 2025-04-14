import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center bg-white justify-between px-10">
      <div className="flex flex-col items-center justify-center text-newBlue">
        <Image
          src="/assets/logo.png"
          alt="We Tech You Do Logo"
          width={100}
          height={100}
          className="object-contain w-[3.5vw]"
        />
        <p className="font-semibold text-lg">WTYD</p>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
