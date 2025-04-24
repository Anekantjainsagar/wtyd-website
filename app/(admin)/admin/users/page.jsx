"use client";
import API_URI from "@/utils/url";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Users = () => {
  const history = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [sort, setSort] = useState("");

  // useEffect(() => {
  //   if (!getCookie("admin_token")) {
  //     history.push("/login");
  //   }
  // }, [history]);

  const getUsers = () => {
    axios
      .get(`${API_URL}/user/get-users`)
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    usersData && (
      <div className="bg-gray-100">
        <Toaster />
        <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[90vh] shadow-md shadow-gray-200">
          <div className="text-black flex items-center justify-between px-4 border-b pb-2">
            <p className="font-bold">All Users ({usersData?.length})</p>
            <div>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
                className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
              >
                <option className="py-1" value="Sort By">
                  Sort By
                </option>
                <option className="py-1" value="Ascending">
                  Ascending
                </option>
                <option className="py-1" value="Descending">
                  Descending
                </option>
              </select>
            </div>
          </div>
          <div className="px-2 pt-2">
            {usersData
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
              .map((e, i) => {
                return <Product data={e} key={i} getUsers={getUsers} />;
              })}
          </div>
        </div>
      </div>
    )
  );
};

const Product = ({ data, getUsers }) => {
  const chartData = {
    labels: ["Rain", "Sunshine", "Cloud", "Lightening"],
    datasets: [
      {
        label: "Feeling Check",
        data: [data?.rain, data?.sunshine, data?.cloud, data?.light],
        backgroundColor: "#413F3F",
        borderRadius: 5,
      },
    ],
  };

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

  return (
    <div className="rounded-md grid grid-cols-4 items-center mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="py-1 ml-3">
        <p className="font-bold text-[16px]">{data?.name}</p>
        <div className="flex items-center">
          <p className="mt-0 text-newBlue text-xs font-bold">{data?.email}</p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="py-0 font-semibold text-newBlue">{data?.phone}</h1>
      </div>
      <div className="mx-auto">
        <Bar data={chartData} options={getChartOptions()} />
      </div>
      <div className="flex justify-end items-center">
        <AiOutlineDelete
          className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            axios
              .post(`${API_URI}/user/delete-user/${data?._id}`)
              .then((res) => {
                if (res.status === 200 && res.data.deletedCount > 0) {
                  getUsers();
                  toast.success("Deleted successfully");
                }
              });
          }}
        />
      </div>
    </div>
  );
};

export default Users;
