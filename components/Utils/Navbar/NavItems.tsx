"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { RootState } from "@/store";
import { NavItemStruct } from "@/store/slices/navSlice";

const NavItems = ({ onClickLink = () => {} }) => {
  const data = useSelector((state: RootState) => state.navItems.navItems);

  return (
    <>
      {data?.map((item, idx) => (
        <NavItem {...item} key={idx} onClickLink={onClickLink} />
      ))}
    </>
  );
};

const NavItem: React.FC<NavItemStruct & { onClickLink?: () => void }> = ({
  title,
  route,
  onClickLink,
}) => {
  const pathname = usePathname();

  return (
    <Link href={route} onClick={onClickLink}>
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
