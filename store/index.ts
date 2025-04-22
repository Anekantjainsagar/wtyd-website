// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "@/store/slices/navSlice";

export const store = configureStore({
  reducer: {
    navItems: navbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
