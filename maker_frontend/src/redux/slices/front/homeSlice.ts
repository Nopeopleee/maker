// React
import { type ReactNode } from "react";

// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setMessage,
  setSeverity,
  setOpen,
} from "@/redux/slices/back/alertSlice";

// Config
import Api from "@/config/api";

// Axios
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

// Lib
import Helper from "@/lib/helper";

interface MenuItem {
  title: string;
  alias: string;
  type: number;
}

interface HomeState {
  menus: MenuItem[];
}

const initialState: HomeState = {
  menus: [],
};

// Fetch Options
export const fetchMenu = createAsyncThunk("frontHome/fetchMenu", async () => {
  const response = await axiosInstance.get(
    `${Api.frontend.home.menu as string}`
  );

  return response.data;
});

export const frontHomeSlice = createSlice({
  name: "frontHome",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menus = action.payload;
    });
  },
});

export const {} = frontHomeSlice.actions;

export default frontHomeSlice.reducer;
