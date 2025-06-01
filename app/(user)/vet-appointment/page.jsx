"use client";
import { useState } from "react";
import Head from "next/head";
import API_URI from "@/utils/url";
import { getCookie } from "@/utils/cookies";

export default function BookAppointment() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dogName: "",
    breed: "",
    gender: "Male",
    date: "",
    reason: "",
    agree: false,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      setStatus("Please agree to the terms.");
      return;
    }

    // Field validation
    const {
      fullName,
      email,
      phone,
      dogName,
      breed,
      gender,
      date,
      reason,
      agree,
    } = form;

    if (
      !fullName ||
      !email ||
      !phone ||
      !dogName ||
      !breed ||
      !gender ||
      !date ||
      !reason ||
      !agree
    ) {
      setStatus("Please fill in all fields and agree to the terms.");
      return;
    }

    try {
      const res = await fetch(`${API_URI}/api/v1/users/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Something went wrong");

      setStatus("Appointment booked successfully!");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        dogName: "",
        breed: "",
        gender: "Male",
        date: "",
        reason: "",
        agree: false,
      });
    } catch (error) {
      setStatus("Failed to book appointment.");
    }
  };

  return (
    <>
      <Head>
        <title>Free Vet Appointment</title>
      </Head>

      <div className="min-h-screen bg-white">
        {/* Top Banner */}
        <div className="bg-newBlue pt-[10vw] px-[4vw] text-white flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-xl">Wtyd - We Tech Your Dreams</p>
            <h1 className="text-3xl md:text-7xl font-bold mt-1">
              Free Vet Appointment
            </h1>
          </div>
          <img
            src="/assets/doctor.png"
            alt="Vet Doctor"
            className="w-[40vw] mt-4 md:mt-0"
          />
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-400/30 rounded-md shadow-md mt-[4vh]">
          <h2 className="text-center text-2xl font-bold text-newBlue mb-6">
            Book Now
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Dog Owner's Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            <Input
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Mobile Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              label="Dog's Name"
              name="dogName"
              value={form.dogName}
              onChange={handleChange}
            />
            <Input
              label="Breed"
              name="breed"
              value={form.breed}
              onChange={handleChange}
            />

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold">Gender</label>
              <div className="flex items-center space-x-4 mt-1">
                {["Male", "Female"].map((g) => (
                  <label key={g} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <Input
              label="Preferred Appointment Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
            <Input
              label="Reason for Appointment"
              name="reason"
              value={form.reason}
              onChange={handleChange}
            />

            {/* Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <span className="text-sm text-gray-700">
                I agree that the details provided are accurate.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-newBlue text-white font-bold py-2 rounded"
            >
              BOOK
            </button>

            {status && (
              <p className="text-center mt-2 text-sm text-blue-700">{status}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold">{label}</label>
      <input {...props} className="w-full p-2 bg-gray-100 rounded" />
    </div>
  );
}
