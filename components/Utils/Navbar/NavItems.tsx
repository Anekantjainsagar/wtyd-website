"use client";
import React from "react";
import Link from "next/link";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <Link href={route}>
      <div
        className={`${
          pathname == route ? "text-newBlue" : "text-newGrey hover:text-newBlue"
        } text-xl cursor-pointer`}
      >
        {title}
      </div>
    </Link>
  );
};

export default NavItems;
