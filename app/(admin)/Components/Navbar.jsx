import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiWorld } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 bg-white py-1.5 border-b">
      <Link href="/" target="_blank">
        <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
          <BiWorld size={20} />
        </div>
      </Link>
      <div className="flex items-center">
        <Image
          src={"/assets/logo.png"}
          width={1000}
          height={1000}
          alt="Logo"
          className="w-[6vw] mr-4"
        />
        <div className="flex flex-col items-start">
          <p className="text-newBlue font-bold">Wtyd</p>
          <p className="mt-0">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
