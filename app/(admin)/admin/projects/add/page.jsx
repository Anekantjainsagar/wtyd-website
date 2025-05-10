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
  const editorRef = useRef(null);
  const { projects, setProjects } = useContext(AdminContext);
  const [product, setProduct] = useState({ title: "", category: "" });
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
    const content = editorRef.current?.getContent();

    if (!product?.title || !product?.category || !image || !content) {
      toast.error("Please fill all the required fields.");
      return;
    }

    setSavingBlog(true);
    try {
      const res = await axios.post(
        `${API_URI}/api/v1/admin/projects/add`,
        {
          image: image,
          title: product?.title.trim(),
          desc: content.trim(),
          category: product?.category.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (res.status === 201) {
        setProjects([...projects, res.data.data]);
        toast.success("Project added successfully!");
        history.push("/admin/projects");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to save project");
    } finally {
      setSavingBlog(false);
    }
  };

  return (
    <div className="h-[90vh] overflow-y-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4 cursor-pointer gradientHover w-fit text-newBlue">
        Add New Project
      </h1>

      <div className="px-2">
        <input
          type="text"
          value={product?.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
          placeholder="Enter Project Title *"
        />
        <input
          type="text"
          value={product?.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
          placeholder="Enter Project Category *"
        />

        <Editor
          apiKey="b887tqysd247td71uhou47927s7mrfwtpciezsx7sndajlol"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <div className="w-8/12 mt-4 mx-auto">
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

        <button
          onClick={saveProject}
          disabled={uploadingImage || savingBlog}
          className={`w-full py-1.5 rounded-md text-white ${
            savingBlog || uploadingImage
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-newBlue"
          }`}
        >
          {savingBlog ? "Saving Project..." : "Save Project"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
