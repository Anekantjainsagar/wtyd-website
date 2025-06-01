"use client";
import React, { useContext, useState } from "react";
import AdminContext from "@/context/AdminContext";
import { IoReload } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Appointments = () => {
  const { appointments, getAllAppointments } = useContext(AdminContext);
  const [spinning, setSpinning] = useState(false);

  const handleReload = async () => {
    setSpinning(true);
    await getAllAppointments();
    setTimeout(() => setSpinning(false), 500);
    toast.success("Appointments refreshed");
  };

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[90vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold text-2xl">
            All Appointments ({appointments?.length || 0})
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
          {appointments?.map((appointment, index) => (
            <AppointmentCard key={index} data={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ data }) => {
  return (
    <div className="rounded-md flex flex-col gap-1 mb-3 shadow-sm shadow-gray-200 p-3">
      <p className="text-black text-lg font-bold">
        {data.fullName} ({data.email})
      </p>
      <p className="text-sm text-gray-600">Phone: {data.phone}</p>
      <p className="text-sm text-gray-600">
        Pet: {data.dogName} ({data.breed}, {data.gender})
      </p>
      <p className="text-sm text-gray-700">Reason: {data.reason}</p>
      <p className="text-sm text-gray-700">
        Appointment Date: {new Date(data.date).toLocaleDateString()}
      </p>
      <p className="text-xs text-gray-400">
        Submitted: {new Date(data.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Appointments;
