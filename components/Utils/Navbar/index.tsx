"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Signup from "./Signup";
import NavItems from "./NavItems";
import { IoMenu } from "react-icons/io5";
import MobileMenu from "./MobileMenu"; // NEW COMPONENT

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed z-50 top-0 left-0 py-4 md:py-5 px-[3vw] w-full flex items-center bg-white justify-between border-b border-b-gray-200 shadow-md">
        <Link href="/">
          <Image
            width={1000}
            height={1000}
            priority
            src="/assets/logo.png"
            alt="We Tech You Do Logo"
            className="object-contain w-[20vw] md:w-[10vw] cursor-pointer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-x-10">
          <NavItems />
          <Signup />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden block">
          <IoMenu
            onClick={() => setMenuOpen(true)}
            className="text-3xl cursor-pointer text-newBlue"
          />
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
