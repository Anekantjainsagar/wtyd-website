"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import API_URI from "@/utils/url";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import AdminContext from "@/context/AdminContext";
import { getCookie } from "@/utils/cookies";

const AddBlog = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const editorRef = useRef(null);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    _id: "",
  });
  const [image, setImage] = useState("");
  const { setBlogs, blogs } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!blogs || blogs.length === 0) return;

    const temp = blogs.find(
      (e) =>
        e?.title
          ?.toLowerCase()
          ?.replaceAll(" ", "-")
          .replaceAll(",", "")
          .replaceAll(":", "")
          .replaceAll(";", "") === id
    );

    if (temp) {
      setImage(temp?.coverImage);
      setProduct({
        title: temp?.title,
        description: temp?.content,
        _id: temp?._id,
      });
      const interval = setInterval(() => {
        if (editorRef.current) {
          editorRef.current.setContent(temp?.content || "");
          clearInterval(interval);
        }
      }, 100); // Retry every 100ms until editor is ready
    } else {
      toast.error("Blog not found.");
    }

    setLoading(false);
  }, [id]);

  const saveBlog = () => {
    const editorContent = editorRef.current?.getContent();

    if (product?.title && image && editorContent) {
      setSaving(true);
      axios
        .put(
          `${API_URI}/api/v1/admin/blogs/update/${product?._id}`,
          {
            coverImage: image,
            title: product.title,
            content: editorContent,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Blog updated successfully");

            // Update that specific blog in setBlogs
            setBlogs((prevBlogs) =>
              prevBlogs.map((blog) =>
                blog?.title
                  ?.toLowerCase()
                  ?.replaceAll(" ", "-")
                  .replaceAll(",", "")
                  .replaceAll(":", "")
                  .replaceAll(";", "") === id
                  ? {
                      ...blog,
                      coverImage: image,
                      title: product.title,
                      content: editorContent,
                    }
                  : blog
              )
            );

            router.push("/admin/blogs");
          }
        })
        .catch((err) => {
          toast.error("Failed to update blog");
          console.error(err);
        })
        .finally(() => setSaving(false));
    } else {
      toast.error("Please fill the necessary details");
    }
  };

  if (loading) {
    return (
      <div className="h-[82vh] flex items-center justify-center">
        <p className="text-gray-500">Loading blog data...</p>
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-y-auto px-3">
      <Toaster />
      <h1 className="text-xl font-bold mb-2 cursor-pointer gradientHover w-fit text-newBlue">
        Update Blog
      </h1>
      <input
        type="text"
        value={product?.title}
        onChange={(e) =>
          setProduct((prev) => ({ ...prev, title: e.target.value }))
        }
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
            alt={product?.title + " Image"}
          />
        ) : (
          <div className="h-[50vh] bg-gray-200 rounded-md"></div>
        )}

        <input
          type="file"
          className="my-3"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setImageLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "upload_photo");
            formData.append("cloud_name", "dfk09gblw");

            fetch("https://api.cloudinary.com/v1_1/dfk09gblw/image/upload", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((res) => {
                if (res?.url) {
                  setImage(res.url);
                  toast.success("Image uploaded successfully");
                } else {
                  toast.error("Image upload failed");
                }
              })
              .catch((err) => {
                console.error(err);
                toast.error("Image upload error");
              })
              .finally(() => setImageLoading(false));
          }}
        />
        {imageLoading && (
          <p className="text-sm text-center text-gray-500">
            Uploading image...
          </p>
        )}
      </div>

      <button
        onClick={saveBlog}
        className="bg-newBlue text-white w-full py-1.5 rounded-md mt-4 disabled:opacity-50"
        disabled={saving || imageLoading}
      >
        {saving ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
};

export default AddBlog;
