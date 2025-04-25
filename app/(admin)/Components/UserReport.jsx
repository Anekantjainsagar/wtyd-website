"use client";
import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Select from "./Utils/Select";
import AdminContext from "@/context/AdminContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getChartOptions = () => {
  return {
    scales: {
      x: {
        ticks: {
          color: "#413F3F", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#413F3F", // Y-axis label color
          callback: function (value) {
            // Display only numeric and positive values on the Y-axis
            if (Number.isInteger(value) && value >= 0) {
              return value;
            }
          },
        },
      },
    },
    ticks: {
      precision: 0,
    },
    plugins: {
      legend: {
        // display: false, // Set the dataset label display to false
        labels: {
          color: "#413F3F", // Set the label color here (if you have other labels, not dataset label)
        },
      },
    },
  };
};

const UserReport = () => {
  const {
    filteredUsers,
    monthlyUsersReport,
    years,
    selectedYear,
    setSelectedYear,
  } = useContext(AdminContext);

  const dataUsers = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Registered Users",
        data: monthlyUsersReport,
        backgroundColor: "#0043C0",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="p-6 bg-white mb-4 rounded-3xl shadow-md shadow-gray-200">
      <div className="flex justify-between h-[75vh] gap-x-6">
        <div className="w-[80%] flex flex-col justify-between border shadow-md shadow-gray-100 h-full p-8 rounded-3xl">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold text-darkGrey">Users Report</p>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              options={years}
            />
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <Bar data={dataUsers} options={getChartOptions()} />
          </div>
        </div>
        <div className="w-[25%] h-full rounded-3xl shadow-md shadow-gray-100 border px-4 py-8 space-y-8 flex flex-col">
          <h1 className="text-3xl font-semibold text-center">Users</h1>
          <div className="flex flex-col justify-between items-center flex-grow space-y-4 pb-8">
            <StatCard label="This Day" value={filteredUsers?.day} />
            <StatCard label="This Week" value={filteredUsers?.week} />
            <StatCard label="This Month" value={filteredUsers?.month} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white text-darkGrey w-[50%] flex flex-col justify-between items-center py-4 rounded-lg border">
      <span className="text-lg">{label}</span>
      <div className="flex items-center">
        <p
          className={`font-semibold text-4xl mt-2 ${
            value > 0 ? "text-green-600" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default UserReport;
