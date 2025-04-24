"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputField from "@/components/Login/InputField";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await register(values.name, values.email, values.password);
      if (res.success) {
        toast.success("Registered successful!");
        router.push("/user/dashboard");
      } else {
        setError(res.message);
        toast.error(res.message || "Registraion failed.");
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (
      formik?.errors?.name &&
      formik?.errors?.name != "Required" &&
      formik.values.name
    ) {
      toast.error(formik.errors.name);
    }
    if (
      formik?.errors?.email &&
      formik?.errors?.email != "Required" &&
      formik.values.email
    ) {
      toast.error(formik.errors.email);
    }
    if (
      formik?.errors?.password &&
      formik?.errors?.password != "Required" &&
      formik.values.password
    ) {
      toast.error(formik.errors.password);
    }
  }, [formik.errors, formik.touched]);

  return (
    <div className="h-[100vh] flex-col lg:flex-row bg-newBlue flex items-center justify-center">
      {/* Left */}
      <div className="lg:w-1/2 h-full flex items-center justify-center">
        <Image
          src="/assets/login.png"
          alt="Register Illustration"
          width={10000}
          height={10000}
          className="z-10 max-w-full h-auto w-full"
        />
      </div>

      {/* Right */}
      <div className="lg:w-1/2 h-[100vh] px-12 md:px-16 pb-8 md:pb-12 pt-[8vw] bg-white flex flex-col items-center justify-center">
        <h2 className="text-[45px] font-semibold mb-2 w-full">
          Create Account
        </h2>
        <p className="text-newGrey text-lg mb-6 w-full">
          Register and get started
        </p>

        {error && (
          <div className="w-full mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="w-full mt-[3vw]">
          <InputField
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
          />
          <InputField
            label="Email address"
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-lg bg-newBlue text-white py-3 rounded-md font-semibold mt-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

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
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
