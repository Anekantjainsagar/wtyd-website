"use client";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
  const isAuthenticated = false;
  // const { isAuthenticated } = useAuthCheck();

  return isAuthenticated ? (
    <Link href="/user/dashboard">
      <Image
        src="/assets/members/people.png"
        alt="User Image"
        width={1000}
        height={1000}
        className="w-[3vw] h-[3vw] object-cover object-top rounded-full"
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
