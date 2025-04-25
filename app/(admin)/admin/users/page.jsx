"use client";
import UserBlock from "./UserBlock";
import { IoReload } from "react-icons/io5";
import AdminContext from "@/context/AdminContext";
import React, { useContext, useState } from "react";
import Select from "@/app/(admin)/Components/Utils/Select";

const Users = () => {
  const { users, getAllUsers } = useContext(AdminContext);
  const [sort, setSort] = useState("");
  const [spinning, setSpinning] = useState(false);

  const handleReload = async () => {
    setSpinning(true);
    await getAllUsers();
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    users && (
      <div className="bg-gray-100">
        <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[90vh] shadow-md shadow-gray-200">
          <div className="text-black flex items-center justify-between px-4 border-b pb-4">
            <p className="font-bold text-2xl">All Users ({users?.length})</p>
            <div className="gap-x-4 flex items-center">
              <IoReload
                title="Refresh Data"
                className={`text-xl cursor-pointer transition-transform ${
                  spinning ? "animate-spin" : ""
                }`}
                onClick={handleReload}
              />
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                options={["Sort By", "Ascending", "Descending"]}
              />
            </div>
          </div>
          <div className="p-4">
            {users
              ?.sort((a, b) => {
                if (sort == "Descending") {
                  let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                  if (fa < fb) {
                    return 1;
                  }
                  if (fa > fb) {
                    return -1;
                  }
                  return 0;
                } else if (sort == "Ascending") {
                  let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                  if (fa < fb) {
                    return -1;
                  }
                  if (fa > fb) {
                    return 1;
                  }
                  return 0;
                }
                return 0;
              })
              .map((userData, i) => {
                return <UserBlock data={userData} key={i} />;
              })}
          </div>
        </div>
      </div>
    )
  );
};

export default Users;
