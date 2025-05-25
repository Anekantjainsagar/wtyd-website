"use client";
import API_URI from "@/utils/url";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      toast.loading("Sending message...", { id: "submit" });

      const response = await fetch(`${API_URI}/api/v1/users/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success("Message sent successfully!", { id: "submit" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: "submit" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-[20vw] md:pt-[6vw] px-[5vw] md:px-[3vw] flex items-center justify-between">
      <Toaster />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-newBlue mb-2 md:mb-6 leading-tight">
            Ready to Start <br /> Your Project?
          </h1>
          <p className="text-lg md:text-2xl text-gray-700">
            Let's collaborate to bring your ideas to life. Reach out to us for a
            consultation or to learn more about our services.
          </p>
        </div>

        {/* Right Form */}
        <div className="flex justify-end">
          <div className="backdrop-blur-md bg-white/60 border border-white/30 shadow-2xl p-5 md:p-10 rounded-3xl w-full md:w-10/12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newBlue transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newBlue transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newBlue transition-all"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newBlue transition-all"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-newBlue text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
