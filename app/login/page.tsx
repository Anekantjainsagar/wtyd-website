"use client";

import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/Login/InputField";

export default function LoginPage() {
  return (
    <div className="h-[100vh] flex-col lg:flex-row bg-newBlue flex items-center justify-center">
      {/* Left */}
      <div className="lg:w-1/2 h-full flex items-center justify-center">
        <Image
          src="/assets/login.png"
          alt="Login Illustration"
          width={10000}
          height={10000}
          className="z-10 max-w-full h-auto w-full"
        />
      </div>

      {/* Right */}
      <div className="lg:w-1/2 h-[100vh] px-12 md:px-16 pb-8 md:pb-12 pt-[8vw] bg-white flex flex-col items-center justify-center">
        <h2 className="text-[45px] font-semibold mb-2 w-full">Login</h2>
        <p className="text-newGrey text-lg mb-6 w-full">
          Welcome back and get started
        </p>

        <form className="w-full mt-[3vw]">
          <InputField
            label="Email address"
            type="email"
            placeholder="Enter your Email"
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <button className="w-full text-lg bg-newBlue text-white py-3 rounded-md font-semibold mt-2">
            Login
          </button>

          <div className="text-right mt-2">
            <Link href="/" className="text-base text-newBlue hover:underline">
              Forgot password ?
            </Link>
          </div>

          <div className="my-10 border-t border-gray-300" />

          <button
            type="button"
            className="w-full flex items-center justify-center gap-x-4 border border-gray-300 rounded-md py-3 shadow-md transition"
          >
            <Image
              src="/assets/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
            />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center mt-6 text-lg">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
