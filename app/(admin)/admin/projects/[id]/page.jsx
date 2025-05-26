"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import API_URI from "@/utils/url";
import AdminContext from "@/context/AdminContext";
import { getCookie } from "@/utils/cookies";
import { Editor } from "@tinymce/tinymce-react";

export default function UpdateProject({ params }) {
  const { id } = React.use(params);
  const router = useRouter();
  const editorRef = useRef(null);
  const { setProjects, projects } = useContext(AdminContext);
  const [project, setProject] = useState({
    title: "",
    description: "",
    _id: "",
    category: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const temp = projects.find(
      (p) =>
        p?.title
          ?.toLowerCase()
          ?.replaceAll(" ", "-")
          .replaceAll(",", "")
          .replaceAll(":", "")
          .replaceAll(";", "")
          .replaceAll("’", "")
          .replaceAll("'", "") === id
    );
    if (temp) {
      setImage(temp?.image);
      setProject({
        title: temp?.title,
        description: temp?.desc,
        _id: temp?._id,
        category: temp?.category,
      });

      const interval = setInterval(() => {
        if (editorRef.current) {
          editorRef.current.setContent(temp?.desc || "");
          clearInterval(interval);
        }
      }, 100); // Retry every 100ms until editor is ready
    } else {
      toast.error("Project not found.");
    }

    setLoading(false);
  }, [id]);

  const saveProject = () => {
    const editorContent = editorRef.current?.getContent();
    if (project?.title && project?.category && image && editorContent) {
      setSaving(true);
      axios
        .put(
          `${API_URI}/api/v1/admin/projects/update/${project?._id}`,
          {
            image: image,
            title: project.title,
            desc: editorContent,
            category: project?.category,
          },
          {
            headers: { Authorization: `Bearer ${getCookie("token")}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Project updated successfully");
            setProjects((prev) =>
              prev.map((p) =>
                p?.title
                  ?.toLowerCase()
                  ?.replaceAll(" ", "-")
                  .replaceAll(",", "")
                  .replaceAll(":", "")
                  .replaceAll(";", "")
                  .replaceAll("’", "")
                  .replaceAll("'", "") === id
                  ? {
                      ...p,
                      image: image,
                      title: project.title,
                      desc: editorContent,
                      category: project?.category,
                    }
                  : p
              )
            );
            router.push("/admin/projects");
          }
        })
        .catch((err) => {
          toast.error("Failed to update project");
          console.error(err);
        })
        .finally(() => setSaving(false));
    } else {
      toast.error("Please fill the necessary details");
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

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        Loading project data...
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-y-auto px-3">
      <Toaster />
      <h1 className="text-xl font-bold mb-2 text-newBlue">Update Project</h1>
      <input
        type="text"
        value={project?.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
        className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
        placeholder="Enter Project Title *"
      />
      <input
        type="text"
        value={project?.category}
        onChange={(e) => setProject({ ...project, category: e.target.value })}
        className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
        placeholder="Enter Project Category *"
      />

      <Editor
        apiKey="s89tnfhgswa50wktxa85cxrbn8ltk43yruhoqevvpqa6s0b2"
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
            "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      <div className="w-full mt-4 mx-auto">
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
          className="mt-3 bg-newBlue w-full hover:bg-blue-600 transition-all text-white px-6 py-2 rounded-md"
          onClick={saveProject}
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Project"}
        </button>
      </div>
    </div>
  );
}
