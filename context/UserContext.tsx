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

export interface Blog {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  author: string;
  isPublished: boolean;
}

export interface ProjectType {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
}

export interface UserContextType {
  blogs: Blog[];
  setBlogs: Dispatch<SetStateAction<Blog[]>>;
  getBlogs: () => void;

  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<MemberType[]>([]);

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

  useEffect(() => {
    getBlogs();
    getProjects();
    getTeam();
  }, []);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
