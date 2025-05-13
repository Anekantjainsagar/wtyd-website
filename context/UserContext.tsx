"use client";
import axios from "axios";
import API_URI from "@/utils/url";
import toast from "react-hot-toast";
import { getCookie } from "@/utils/cookies";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { MemberType } from "@/components/Teams/MemberBlock";
import { useAuth } from "./AuthContext";
import { BlogType } from "@/components/Home/blogs/VerticalBlog";

export interface ProjectType {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
}

export interface UserContextType {
  myBlogs: BlogType[];
  setMyBlogs: Dispatch<SetStateAction<BlogType[]>>;

  blogs: BlogType[];
  setBlogs: Dispatch<SetStateAction<BlogType[]>>;
  getBlogs: () => void;

  projects: ProjectType[];
  setProjects: Dispatch<SetStateAction<ProjectType[]>>;
  getProjects: () => void;

  team: MemberType[];
  setTeam: Dispatch<SetStateAction<MemberType[]>>;
  getTeam: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function createMarkupText(content?: string) {
  return { __html: content ?? "" };
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [myBlogs, setMyBlogs] = useState<BlogType[]>([]);
  const [team, setTeam] = useState<MemberType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const getTeam = () => {
    axios
      .get(`${API_URI}/api/v1/users/team`)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setTeam(res.data.data);
        }
      })
      .catch((e) => {
        toast.error(e.response?.data?.error || "Failed to fetch team");
      });
  };

  const getProjects = () => {
    axios
      .get(`${API_URI}/api/v1/users/projects`)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setProjects(res.data.data);
        }
      })
      .catch((e) => {
        toast.error(e.response?.data?.error || "Failed to fetch projects");
      });
  };

  const getBlogs = () => {
    axios
      .get(`${API_URI}/api/v1/users/blogs/`)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setBlogs(res.data.data);
        }
      })
      .catch((e) => {
        toast.error(e.response?.data?.error || "Failed to fetch blogs");
      });
  };

  const getAllBlogs = () => {
    axios
      .get(`${API_URI}/api/v1/users/my-blogs/`, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setMyBlogs(res.data.data);
        }
      })
      .catch((e) => {
        toast.error(e.response?.data?.error || "Failed to fetch blogs");
      });
  };

  useEffect(() => {
    getBlogs();
    getProjects();
    getTeam();
  }, []);

  useEffect(() => {
    getAllBlogs();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        getBlogs,
        blogs,
        setBlogs,
        projects,
        setProjects,
        getProjects,
        team,
        setTeam,
        getTeam,
        myBlogs,
        setMyBlogs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
