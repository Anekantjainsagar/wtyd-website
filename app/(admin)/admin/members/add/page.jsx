"use client";
import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import API_URI from "@/utils/url";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "@/utils/cookies";
import AdminContext from "@/context/AdminContext";

const AddBlog = () => {
  const history = useRouter();
  const { team, setTeam } = useContext(AdminContext);
  const [product, setProduct] = useState({
    name: "",
    title: "",
    description: "",
    facebook: "",
    linkedin: "",
    github: "",
  });
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingBlog, setSavingBlog] = useState(false);

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

  const saveProject = async () => {
    if (
      !product?.title ||
      !product?.name ||
      !product?.description ||
      !product?.github ||
      !product?.linkedin ||
      !product?.facebook ||
      !image
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    if (
      !product?.github.includes("https") ||
      !product?.linkedin.includes("https") ||
      !product?.facebook.includes("https")
    ) {
      toast.error("Please enter the correct URL.");
      return;
    }

    setSavingBlog(true);
    try {
      const res = await axios.post(
        `${API_URI}/api/v1/admin/team/add`,
        {
          image,
          ...product,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (res.status === 201) {
        setTeam([...team, res.data.data]);
        toast.success("Team Member added successfully!");
        history.push("/admin/members");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to save member");
    } finally {
      setSavingBlog(false);
    }
  };

  return (
    <div className="h-[90vh] overflow-y-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4 cursor-pointer gradientHover w-fit text-newBlue">
        Add New Member
      </h1>

      <div className="px-2">
        <div className="flex items-start gap-x-8">
          <div className="w-6/12">
            {image ? (
              <Image
                width={100}
                height={100}
                src={image}
                className="object-cover w-full object-center rounded-md"
                alt="Uploaded Image"
              />
            ) : (
              <div className="h-[50vh] bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
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
          <div className="w-6/12">
            <input
              type="text"
              value={product?.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Name *"
            />
            <input
              type="text"
              value={product?.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Position *"
            />
            <input
              type="text"
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Description *"
            />
            <input
              type="url"
              value={product?.facebook}
              onChange={(e) =>
                setProduct({ ...product, facebook: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Facebook URL *"
            />
            <input
              type="url"
              value={product?.github}
              onChange={(e) =>
                setProduct({ ...product, github: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Github URL *"
            />
            <input
              type="url"
              value={product?.linkedin}
              onChange={(e) =>
                setProduct({ ...product, linkedin: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Linkedin URL *"
            />
          </div>
        </div>

        <button
          onClick={saveProject}
          disabled={uploadingImage || savingBlog}
          className={`w-full py-1.5 rounded-md text-white ${
            savingBlog || uploadingImage
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-newBlue"
          }`}
        >
          {savingBlog ? "Saving Team Member..." : "Save Team Member"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
