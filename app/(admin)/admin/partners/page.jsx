"use client";
import React, { useContext, useState } from "react";
import AdminContext from "@/context/AdminContext";
import { IoReload } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Contacts = () => {
  const { contacts, getContacts } = useContext(AdminContext);
  const [spinning, setSpinning] = useState(false);

  const handleReload = async () => {
    setSpinning(true);
    await getContacts();
    setTimeout(() => setSpinning(false), 500);
    toast.success("Contacts refreshed");
  };

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[90vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold text-2xl">
            All Contacts ({contacts?.length || 0})
          </p>
          <IoReload
            title="Refresh Data"
            className={`text-xl cursor-pointer transition-transform ${
              spinning ? "animate-spin" : ""
            }`}
            onClick={handleReload}
          />
        </div>

        <div className="px-2 pt-2">
          {contacts?.map((contact, index) => (
            <ContactCard key={index} data={contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ data }) => {
  const truncate = (str) => (str?.length > 20 ? str.slice(0, 20) + "..." : str);

  return (
    <div className="rounded-md flex items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-3">
      <div className="flex flex-col w-full">
        <p className="text-black text-lg font-bold">
          {data.name} ({data.email})
        </p>
        <p className="text-sm text-gray-600 mt-1">Phone: {data.phone}</p>
        <p className="text-sm text-gray-700 mt-2">Message: {data.message}</p>
        <p className="text-xs text-gray-400 mt-2">
          Received: {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Contacts;
