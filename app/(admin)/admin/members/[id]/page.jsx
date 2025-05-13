"use client";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import API_URI from "@/utils/url";
import AdminContext from "@/context/AdminContext";
import { getCookie } from "@/utils/cookies";

export default function UpdateProject({ params }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { setTeam, team } = useContext(AdminContext);
  const [project, setProject] = useState({
    name: "",
    title: "",
    description: "",
    facebook: "",
    linkedin: "",
    github: "",
    _id: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!team || team.length === 0) return;
    const temp = team.find(
      (p) =>
        p?.name
          ?.toLowerCase()
          ?.replaceAll(" ", "-")
          .replaceAll(",", "")
          .replaceAll(":", "")
          .replaceAll(";", "") === id
    );
    if (temp) {
      setImage(temp?.image);
      setProject({
        ...temp,
      });
    } else {
      toast.error("Project not found.");
    }

    setLoading(false);
  }, [id]);

  const saveProject = () => {
    if (
      !project?.title ||
      !project?.name ||
      !project?.description ||
      !project?.github ||
      !project?.linkedin ||
      !project?.facebook ||
      !image
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    if (
      !project?.github.includes("https") ||
      !project?.linkedin.includes("https") ||
      !project?.facebook.includes("https")
    ) {
      toast.error("Please enter the correct URL.");
      return;
    }

    setSaving(true);
    axios
      .put(
        `${API_URI}/api/v1/admin/team/update/${project?._id}`,
        {
          image,
          ...project,
        },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Project updated successfully");
          setTeam((prev) =>
            prev.map((p) =>
              p?.name
                ?.toLowerCase()
                ?.replaceAll(" ", "-")
                .replaceAll(",", "")
                .replaceAll(":", "")
                .replaceAll(";", "") === id
                ? {
                    ...project,
                    image: image,
                  }
                : p
            )
          );
          router.push("/admin/members");
        }
      })
      .catch((err) => {
        toast.error("Failed to update Team Member");
        console.error(err);
      })
      .finally(() => setSaving(false));
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
        Loading Team Member data...
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-y-auto px-3">
      <Toaster />
      <h1 className="text-xl font-bold mb-2 text-newBlue">Update Project</h1>

      <div className="w-full mt-4 mx-auto">
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
              value={project?.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Name *"
            />
            <input
              type="text"
              value={project?.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Position *"
            />
            <input
              type="text"
              value={project?.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Description *"
            />
            <input
              type="url"
              value={project?.facebook}
              onChange={(e) =>
                setProject({ ...project, facebook: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Facebook URL *"
            />
            <input
              type="url"
              value={project?.github}
              onChange={(e) =>
                setProject({ ...project, github: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Github URL *"
            />
            <input
              type="url"
              value={project?.linkedin}
              onChange={(e) =>
                setProject({ ...project, linkedin: e.target.value })
              }
              className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
              placeholder="Enter Member Linkedin URL *"
            />
          </div>
        </div>
        <button
          className="mt-3 bg-newBlue w-full hover:bg-blue-600 transition-all text-white px-6 py-2 rounded-md"
          onClick={saveProject}
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Team Member"}
        </button>
      </div>
    </div>
  );
}
