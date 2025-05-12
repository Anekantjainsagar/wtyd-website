"use client";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import API_URI from "@/utils/url";
import axios from "axios";
import Link from "next/link";
import Select from "../../Components/Utils/Select";
import AdminContext from "@/context/AdminContext";
import { IoReload } from "react-icons/io5";
import { useConfirm } from "../../Components/Utils/ConfirmProvier";

const Projects = () => {
  const [spinning, setSpinning] = useState(false);
  const { getTeam, team } = useContext(AdminContext);
  const [sortStore, setSortStore] = useState("Sort By");

  const handleReload = async () => {
    setSpinning(true);
    await getTeam();
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[90vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold text-2xl">All Members ({team?.length})</p>
          <div className="gap-x-4 flex items-center">
            <IoReload
              title="Refresh Data"
              className={`text-xl cursor-pointer transition-transform ${
                spinning ? "animate-spin" : ""
              }`}
              onClick={handleReload}
            />
            <Select
              value={sortStore}
              onChange={(e) => setSortStore(e.target.value)}
              options={["Sort By", "Ascending", "Descending"]}
            />
          </div>
        </div>
        <div className="px-2 pt-2">
          {team
            ?.sort((a, b) => {
              const fa = a?.name?.toLowerCase();
              const fb = b?.name?.toLowerCase();

              if (sortStore === "Descending") return fa < fb ? 1 : -1;
              if (sortStore === "Ascending") return fa < fb ? -1 : 1;
              return 0;
            })
            .map((e, i) => {
              return <ProjectCard data={e} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ data }) => {
  const router = useRouter();
  const { requestConfirm } = useConfirm();
  const { team, setTeam } = useContext(AdminContext);

  const handleDelete = () => {
    requestConfirm(`Are you sure you want to delete ${data?.name}?`, () => {
      axios
        .delete(`${API_URI}/api/v1/admin/team/delete/${data?._id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setTeam(team?.filter((p) => p?._id !== data?._id));
            toast.success("Deleted successfully");
          }
        });
    });
  };

  return (
    <div className="rounded-md flex items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex w-[68vw] items-center justify-between">
        <Image
          src={data?.image}
          width={100}
          height={100}
          alt="Image"
          className="w-2/12 h-[20vh] rounded-md object-cover object-center"
        />
        <div className="py-1 w-10/12 ml-3">
          <p className="text-black text-xl font-bold">
            {data?.name} ({data?.title})
          </p>
          <p>{data?.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Link
          href={`https://trubuddies.com/projects/${data?._id}`}
          target="_blank"
        >
          <AiOutlineEye
            className="text-oceanGreen bg-lightOceanGreen p-2 rounded-full hover:text-white hover:bg-oceanGreen transition-all mr-3"
            size={35}
          />
        </Link>
        <AiOutlineEdit
          className="text-blue-500 bg-blue-50 p-2 rounded-full hover:text-white hover:bg-blue-500 transition-all mr-3"
          size={35}
          onClick={() => {
            router.push(
              `/admin/members/${data?.name
                ?.toLowerCase()
                ?.replaceAll(" ", "-")}`
            );
          }}
        />
        <AiOutlineDelete
          className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all mr-3"
          size={35}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Projects;
