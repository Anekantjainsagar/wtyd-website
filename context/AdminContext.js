"use client";
import axios from "axios";
import API_URI from "@/utils/url";
import toast from "react-hot-toast";
import { getCookie } from "@/utils/cookies";
import { createContext, useEffect, useState } from "react";
import { setRequestMeta } from "next/dist/server/request-meta";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredUsers, setFilteredUsers] = useState({
    day: 0,
    week: 0,
    month: 0,
  });
  const [monthlyUsersReport, setMonthlyUsersReport] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);

  const getTeam = () => {
    let token = getCookie("token");

    axios
      .get(`${API_URI}/api/v1/admin/team/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        }
        setTeam(res.data.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  const getProjects = () => {
    let token = getCookie("token");

    axios
      .get(`${API_URI}/api/v1/admin/projects/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        }
        setProjects(res.data.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  const getBlogs = () => {
    let token = getCookie("token");

    axios
      .get(`${API_URI}/api/v1/admin/blogs/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        }
        setBlogs(res.data.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  const deleteUser = (userId) => {
    let token = getCookie("token");

    axios
      .delete(`${API_URI}/api/v1/admin/users/delete?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        }
        if (res.data.data.deltedCount != 0) {
          toast.success("Deleted Successfully");
          setUsers((users) => users?.filter((user) => user?._id != userId));
        }
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  const getAllUsers = () => {
    let token = getCookie("token");

    axios
      .get(`${API_URI}/api/v1/admin/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        }
        setUsers(res.data.data);

        const users = res.data.data;
        const userYears = Array.from(
          new Set(users.map((u) => new Date(u.createdAt).getFullYear()))
        ).sort((a, b) => b - a); // Descending order

        setYears(userYears);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  useEffect(() => {
    if (!users.length) return;

    const monthCounts = Array(12).fill(0);
    users.forEach((user) => {
      const date = new Date(user.createdAt);
      if (date.getFullYear() === Number(selectedYear)) {
        const month = date.getMonth();
        monthCounts[month]++;
      }
    });
    setMonthlyUsersReport(monthCounts);
  }, [selectedYear, users]);

  useEffect(() => {
    if (!users.length) return;

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfToday.getDay()); // Sunday
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let day = 0,
      week = 0,
      month = 0;

    users.forEach((user) => {
      const created = new Date(user.createdAt);
      const year = created.getFullYear();

      if (year === Number(selectedYear)) {
        if (created >= startOfToday) day++;
        if (created >= startOfWeek) week++;
        if (created >= startOfMonth) month++;
      }
    });

    setFilteredUsers({ day, week, month });
  }, [users, selectedYear]);

  useEffect(() => {
    getAllUsers();
    getBlogs();
    getProjects();
    getTeam();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        deleteUser,
        getAllUsers,
        monthlyUsersReport,
        years,
        selectedYear,
        setSelectedYear,
        filteredUsers,
        getBlogs,
        blogs,
        setBlogs,
        projects,
        setProjects,
        getProjects,
        team,
        setTeam,
        getTeam,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
