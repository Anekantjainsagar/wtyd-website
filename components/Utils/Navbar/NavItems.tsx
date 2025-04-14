"use client";
import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { NavItemStruct } from "@/store/slices/navSlice";

const NavItems = () => {
  const data = useSelector((state: RootState) => state.navItems.navItems);

  return (
    <div className="flex items-center gap-x-[5vw]">
      {data?.map((data, idx) => {
        return <NavItem {...data} key={idx} />;
      })}
    </div>
  );
};

const NavItem: React.FC<NavItemStruct> = ({ title, route }) => {
  return (
    <div
      className="text-newGrey text-xl cursor-pointer"
      onClick={() => {
        console.log(route);
      }}
    >
      {title}
    </div>
  );
};

export default NavItems;
