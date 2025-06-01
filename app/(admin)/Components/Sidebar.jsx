"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { RiDashboardLine } from "react-icons/ri";
import { GoProjectRoadmap } from "react-icons/go";
import { CiLogout, CiUser } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { FaBlogger, FaCircleNotch, FaUsers } from "react-icons/fa";
import { FaShieldDog } from "react-icons/fa6";

const Sidebar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const history = useRouter();
  const data = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine size={20} className="mr-2 pb-0.5" />,
      route: "/admin",
    },
    {
      name: "All Users",
      icon: <CiUser size={20} className="mr-2 pb-0.5" />,
      route: "/admin/users",
    },
    {
      name: "Blogs",
      icon: <FaBlogger size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "All Blogs",
          route: "/admin/blogs",
        },
        {
          name: "Add New Blog",
          route: "/admin/blogs/add",
        },
      ],
    },
    {
      name: "Projects",
      icon: <GoProjectRoadmap size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "All Projects",
          route: "/admin/projects",
        },
        {
          name: "Add New Project",
          route: "/admin/projects/add",
        },
      ],
    },
    {
      name: "Team",
      icon: <FaUsers size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "All Members",
          route: "/admin/members",
        },
        {
          name: "Add New Member",
          route: "/admin/members/add",
        },
      ],
    },
    {
      name: "Queries",
      icon: <FaUserGroup size={20} className="mr-2 pb-0.5" />,
      route: "/admin/partners",
    },
    {
      name: "Vet Appointments",
      icon: <FaShieldDog size={20} className="mr-2 pb-0.5" />,
      route: "/admin/appointments",
    },
  ];

  return (
    <div className="w-[15vw] h-[100vh] bg-[#141423] flex flex-col items-center px-2 py-6">
      <Image
        src={"/assets/logo.png"}
        width={10000}
        height={1000}
        alt={"Logo"}
        className="w-10/12"
      />
      <div className="w-full mt-6">
        {data?.map((e, i) => {
          return <NavItem e={e} key={i} />;
        })}
        <div
          onClick={() => {
            logout();
            history.push("/");
          }}
          className={`font-medium hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
            pathname == "/logout" ? "text-white bg-gray-700" : "text-gray-400"
          }`}
        >
          <div className="items-center flex">
            <CiLogout size={20} className="mr-2 pb-0.5" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ e }) => {
  const history = useRouter();
  const pathname = usePathname();
  const [showBottom, setShowBottom] = useState(false);

  return (
    <>
      <div
        onClick={(event) => {
          if (e?.route) {
            history.push(e?.route);
          }
          setShowBottom(!showBottom);
        }}
        className={`font-medium hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
          pathname == e?.route ? "text-white bg-gray-700" : "text-gray-400"
        }`}
      >
        <div className="items-center flex">
          {e?.icon}
          {e?.name}
        </div>
        {e?.sub?.length > 0 && !showBottom && (
          <div className="">
            <AiOutlineRight />
          </div>
        )}
        {e?.sub?.length > 0 && showBottom && (
          <div className="">
            <AiOutlineDown />
          </div>
        )}
      </div>
      {e?.sub?.length > 0 &&
        showBottom &&
        e?.sub?.map((e, i) => {
          return <SubNavItem data={e} key={i} />;
        })}
    </>
  );
};

const SubNavItem = ({ data }) => {
  const pathname = usePathname();
  const history = useRouter();

  return (
    <div
      onClick={(e) => {
        if (data?.route) {
          history.push(data?.route);
        }
      }}
      className={`text-gray-400 font-bold hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-4 mb-0.5 cursor-pointer flex justify-between items-center pl-8 ${
        pathname == data?.route ? "text-white bg-gray-700" : "text-gray-400"
      }`}
    >
      <div className="items-center flex">
        <FaCircleNotch size={10} className="mr-2" />
        {data?.name}
      </div>
    </div>
  );
};

export default Sidebar;
