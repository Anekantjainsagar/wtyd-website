"use client";
import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import API_URI from "@/utils/url";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

const AddBlog = () => {
  const history = useRouter();
  const editorRef = useRef(null);
  const [product, setProduct] = useState({
    title: "",
  });
  const [image, setImage] = useState("");
  const { getBlogs, blogs } = { getBlogs: () => {}, blogs: [] };

  const saveBlog = () => {
    if (product?.title && image && editorRef.current.getContent()) {
      axios
        .post(`${API_URI}/api/v1/admin/blogs/add`, {
          coverImage: image,
          title: product?.title,
          content: editorRef.current.getContent(),
        })
        .then((res) => {
          if (res.status === 200) {
            getBlogs();
            history.push("/admin/blogs");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please fill the necessary details");
    }
  };

  return (
    <div className="h-[90vh] overflow-y-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4 cursor-pointer gradientHover w-fit text-newBlue">
        Add New Blog
      </h1>
      <div className="px-2">
        <input
          type="text"
          value={product?.title}
          onChange={(e) => {
            setProduct({ ...product, title: e.target.value });
          }}
          className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
          placeholder="Enter Blog Title *"
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
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
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
              alt="Default Image"
            />
          ) : (
            <div className="h-[50vh] bg-gray-200 rounded-md"></div>
          )}
          <input
            type="file"
            className="my-3"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              formData.append("upload_preset", "upload_photo");
              formData.append("cloud_name", "dfk09gblw");

              fetch("https://api.Cloudinary.com/v1_1/dfk09gblw/image/upload", {
                method: "POST",
                body: formData,
              })
                .then((res) => res.json())
                .then((res) => {
                  setImage(res.url);
                })
                .catch((err) => {});
            }}
          />
        </div>
        <button
          onClick={saveBlog}
          className="bg-newBlue text-white w-full py-1.5 rounded-md"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
