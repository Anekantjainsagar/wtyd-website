import Image from "next/image";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { GoPencil } from "react-icons/go";

const Dashboard = () => {
  return (
    <div className="bg-[#FAF8FF] py-[9vw] px-[3vw] h-[100vh]">
      <div className="h-[75vh] rounded-3xl shadow-xl shadow-gray-200 relative overflow-hidden">
        <Image
          width={1000}
          height={1000}
          alt="User Cover Image"
          src="/assets/user/cover.png"
          className="w-full h-[50%] object-cover absolute top-0 left-0 z-10"
        />
        <div className="relative z-20 h-full">
          <Image
            src="/assets/members/people.png"
            alt="User Image"
            width={1000}
            height={1000}
            className="w-[20vw] h-[20vw] object-cover object-top rounded-full absolute left-8 top-1/2 -translate-y-1/2"
          />
          <h1 className="text-white font-bold text-6xl absolute left-[23vw] top-[37%]">
            Hii Anekant Jain
          </h1>
          <button className="flex items-center bg-white text-newBlue px-10 py-2.5 text-xl gap-x-3 font-semibold rounded-full absolute right-6 top-6">
            <IoIosLogOut className="text-2xl mt-0.5" />
            LOG OUT
          </button>
          <button className="flex items-center bg-newBlue text-white px-10 py-2.5 text-xl gap-x-3 font-semibold rounded-full absolute right-6 top-[53%]">
            <GoPencil className="text-2xl mt-0.5" />
            EDIT PROFILE
          </button>
          <div className="w-full flex items-end justify-between top-[80%] absolute px-10">
            <div className="text-3xl">
              <p className="text-newBlue font-medium">Project Head</p>
              <p className="text-gray-600 text-xl w-9/12 mt-0.5">
                A blend of creativity, code, and commitment.
              </p>
            </div>
            <div className="flex items-center gap-x-6">
              <Image
                width={1000}
                height={1000}
                src="/assets/social-icons/facebook.png"
                alt="Facebook Icon"
                className="w-[2.25vw] cursor-pointer"
              />
              <Image
                width={1000}
                height={1000}
                src="/assets/social-icons/linkedin.png"
                alt="Linkedin Icon"
                className="w-[2.25vw] cursor-pointer"
              />
              <Image
                width={1000}
                height={1000}
                src="/assets/social-icons/github.png"
                alt="Github Icon"
                className="w-[2.25vw] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
