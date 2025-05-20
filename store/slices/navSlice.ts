"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface NavItemStruct {
  title: string;
  route: string;
}

interface NavItemsArray {
  navItems: NavItemStruct[];
}

const initialState: NavItemsArray = {
  navItems: [
    { title: "About", route: "/about" },
    { title: "Projects", route: "/projects" },
    { title: "Blogs", route: "/blogs" },
    { title: "Our Team", route: "/team" },
    { title: "Contact Us", route: "/contact" },
  ],
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    getNavItems: (state) => state,
  },
});

export const { getNavItems } = navbarSlice.actions;
export default navbarSlice.reducer;
