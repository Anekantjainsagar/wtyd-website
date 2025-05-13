"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const { user } = useAuth();

  return user?._id && user?.role == "user" ? (
    <Link href="/user/dashboard">
      <Image
        src={user?.avatar}
        alt={`${user?.name} Image`}
        width={1000}
        height={1000}
        className="w-[3vw] h-[3vw] object-cover object-top rounded-full"
      />
    </Link>
  ) : user?._id && user?.role != "user" ? (
    <Link href="/admin">
      <Image
        src={"/assets/admin.png"}
        alt={`Admin Image`}
        width={1000}
        height={1000}
        className="border border-gray-200 w-[3vw] h-[3vw] object-cover object-top rounded-full"
      />
    </Link>
  ) : (
    <Link href={"/login"}>
      <button className="bg-newGreen text-white px-7 text-lg py-2.5 rounded-md font-medium">
        Login / Signup
      </button>
    </Link>
  );
};

export default Signup;
