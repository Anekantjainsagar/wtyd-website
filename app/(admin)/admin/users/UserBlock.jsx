"use client";
import { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AdminContext from "@/context/AdminContext";
import { useConfirm } from "../../Components/Utils/ConfirmProvier";

const UserBlock = ({ data }) => {
  const { deleteUser } = useContext(AdminContext);
  const { requestConfirm } = useConfirm();

  const handleDelete = () => {
    requestConfirm(`Are you sure you want to delete ${data?.name}?`, () =>
      deleteUser(data?._id)
    );
  };
  return (
    <div className="rounded-md flex border border-gray-200 justify-between items-center mb-4 cursor-pointer shadow-sm shadow-gray-200 p-4">
      <div className="">
        <p className="font-semibold text-xl mb-1">{data?.name}</p>
        <p className="text-newBlue text-lg">{data?.email}</p>
      </div>
      <div className="flex items-center flex-col">
        <p className="py-0 font-semibold text-newBlue">{data?.phone}</p>
      </div>
      <div className="flex justify-end items-center">
        <AiOutlineDelete
          className="text-red-500 bg-red-50 text-5xl p-3 rounded-full hover:text-white hover:bg-red-500 transition-all"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default UserBlock;
