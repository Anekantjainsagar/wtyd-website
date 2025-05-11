"use client";
import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import NavItems from "./NavItems";
import Signup from "./Signup";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 z-[60] w-full h-screen backdrop-blur-xl bg-white/30 flex flex-col justify-center items-center space-y-10"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-4xl text-newBlue"
      >
        <IoClose />
      </button>

      {/* Nav Links */}
      <div className="flex flex-col items-center space-y-6 text-2xl">
        <NavItems onClickLink={onClose} />
      </div>

      {/* Auth Button */}
      <div className="mt-6" onClick={onClose}>
        <Signup />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
