import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <Link href={"/login"}>
      <button className="bg-newGreen text-white px-7 text-lg py-2.5 rounded-md font-medium">
        Login / Signup
      </button>
    </Link>
  );
};

export default Signup;
