"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import API_URI from "@/utils/url";

// Reusable Input Component
const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  name,
}) => {
  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <input
        type={type}
        className="w-full outline-none border rounded-lg px-4 py-2 mt-1"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
      />
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    profession: "",
    about: "",
    gender: "",
    linkedin: "",
    github: "",
  });

  const { user, setUser } = useAuth();
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    setImage(user?.avatar);
    setFormData({ fullName: user?.name, ...user });
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "mobileNumber",
      "profession",
      "about",
      "gender",
      "linkedin",
      "github",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field}`);
        return;
      }
    }

    try {
      const response = await axios.put(
        `${API_URI}/api/v1/users/me`,
        { ...formData, avatar: image },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (response.data.success) {
        setUser(response.data.data);
        onClose();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("There was an issue updating the profile. Please try again.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_photo");
    formData.append("cloud_name", "dfk09gblw");

    setUploadingImage(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfk09gblw/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data?.url) {
        setImage(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-[45vw] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl"
        >
          &times;
        </button>
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-4">
          Edit Profile
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex items-start gap-x-5 w-full justify-between">
          <div className="w-5/12 mb-4 flex flex-col items-center justify-center">
            {image ? (
              <Image
                width={100}
                height={100}
                src={image}
                className="object-cover rounded-full h-[30vh] w-[30vh] object-center"
                alt="Uploaded Image"
              />
            ) : (
              <div className="h-[30vh] w-[30vh] bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                {uploadingImage ? "Uploading..." : "Image Preview"}
              </div>
            )}
            <input
              type="file"
              className="my-3"
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
          </div>
          <div className="space-y-4 w-7/12">
            <InputField
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required={true}
              name="fullName"
            />
            <InputField
              label="E-mail"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              name="email"
            />
            <InputField
              label="Mobile Number"
              type="text"
              placeholder="Enter number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required={true}
              name="mobileNumber"
            />
            <InputField
              label="Profession"
              type="text"
              placeholder="Your profession"
              value={formData.profession}
              onChange={handleChange}
              required={true}
              name="profession"
            />
            <div>
              <label className="block font-semibold">About</label>
              <textarea
                className="w-full border rounded-lg p-2 mt-1 outline-none"
                placeholder="Tell us about yourself"
                rows={2}
                value={formData.about}
                onChange={handleChange}
                name="about"
                required={true}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Gender</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="accent-blue-600"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="accent-blue-600"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>

            <InputField
              label="LinkedIn ID"
              type="text"
              placeholder="LinkedIn username or URL"
              value={formData.linkedin}
              onChange={handleChange}
              required={true}
              name="linkedin"
            />
            <InputField
              label="GitHub"
              type="text"
              placeholder="GitHub username"
              value={formData.github}
              onChange={handleChange}
              required={true}
              name="github"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold mt-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
