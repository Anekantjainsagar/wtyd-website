import React from "react";
import Link from "next/link";
import Image from "next/image";

import Signup from "./Signup";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <div className="fixed z-50 top-0 left-0 py-2.5 px-[3vw] w-full flex items-center bg-white justify-between border-b border-b-gray-200 shadow-md">
      <div className="flex flex-col items-center justify-center text-newBlue">
        <Link href={"/"}>
          <Image
            width={1000}
            height={1000}
            priority={true}
            src="/assets/logo.png"
            alt="We Tech You Do Logo"
            className="object-contain w-[3.5vw] cursor-pointer"
          />
        </Link>
        <p className="font-semibold text-lg">WTYD</p>
      </div>
      <NavItems />
      <Signup />
    </div>
  );
};

export default Navbar;
