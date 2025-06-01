"use client";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAF8FF]">
        <p className="text-xl md:text-3xl font-semibold text-gray-700">
          Loading User Data...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8FF] md:mt-0 mt-[13vw] py-[10vw] md:py-[9vw] px-[5vw] md:px-[3vw] h-[100vh]">
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="h-[86vh] md:h-[75vh] rounded-3xl shadow-xl shadow-gray-200 relative overflow-hidden">
        <Image
          width={1000}
          height={1000}
          alt="User Cover Image"
          src="/assets/user/cover.png"
          className="w-full h-[50%] object-cover absolute top-0 left-0 z-10"
        />
        <div className="relative z-20 h-full">
          <Image
            alt={`${user?.name} Image`}
            src={user?.avatar}
            width={1000}
            height={1000}
            className="w-[45vw] md:w-[20vw] h-[45vw] md:h-[20vw] object-cover object-top rounded-full absolute left-4 md:left-8 top-1/2 -translate-y-1/2"
          />
          <h1 className="text-white md:w-full w-6/12 md:text-start text-end font-bold text-3xl md:text-6xl absolute right-4 md:left-[23vw] top-[37%]">
            Hii {user?.name}
          </h1>
          <button
            onClick={() => {
              logout();
              toast.success("Logout Successfully");
              router.push("/");
            }}
            className="flex items-center bg-white text-newBlue px-6 md:px-10 py-2 md:py-2.5 md:text-xl gap-x-1.5 md:gap-x-3 font-semibold rounded-full absolute right-4 md:right-6 top-4 md:top-6"
          >
            <IoIosLogOut className="text-xl md:text-2xl mt-0.5" />
            LOG OUT
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex md:uppercase items-center bg-newBlue text-white px-6 md:px-10 py-2.5 md:text-xl gap-x-1.5 md:gap-x-3 font-semibold rounded-full absolute right-3 md:right-6 top-[51.5%] md:top-[53%]"
          >
            <GoPencil className="md:text-2xl mt-0.5" />
            Edit Profile
          </button>
          <div className="w-full flex items-end justify-between bottom-5 md:top-[80%] absolute px-6 md:px-10">
            <div className="text-2xl md:text-3xl">
              <p className="text-newBlue font-medium">{user?.profession}</p>
              <p className="text-gray-600 text-lg md:text-xl w-10/12 mt-0.5">
                {user?.about}
              </p>
            </div>
            <div className="flex items-center gap-x-4 md:gap-x-6 md:mr-0 mr-4">
              {user?.linkedin && (
                <Link href={user?.linkedin} target="_blank">
                  <Image
                    width={1000}
                    height={1000}
                    src="/assets/social-icons/linkedin.png"
                    alt="Linkedin Icon"
                    className="w-[13vw] md:w-[2vw] cursor-pointer"
                  />
                </Link>
              )}
              {user?.github && (
                <Link href={user?.github} target="_blank">
                  <Image
                    width={1000}
                    height={1000}
                    src="/assets/social-icons/github.png"
                    alt="Github Icon"
                    className="w-[13vw] md:w-[2vw] cursor-pointer"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
