// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Config
import Api from "@/config/api";
import { initLanguage, initPage } from "@/config/page";

// Axios
import axios from "axios";

// Interface
import { HomeState, MenuItem } from "@/interface/redux";

const isClient = typeof window !== "undefined";
const initialState: HomeState = {
  language: isClient
    ? localStorage.getItem("language") || initLanguage
    : initLanguage,
  menus: [],
  currentMenu: initPage,
  homepage: [],
  contact: {},
  website: {},
};

// Fetch Options
export const fetchMenu = createAsyncThunk(
  "frontHome/fetchMenu",
  async (page: string, thunkAPI) => {
    const response = await axios.get(`${Api.frontend.home.menu as string}`);

    thunkAPI.dispatch(
      setCurrentMenu(
        response.data.find((item: MenuItem) => item.alias === page) || initPage
      )
    );

    return response.data;
  }
);

// Fetch Homepage
export const fetchHomepage = createAsyncThunk(
  "frontHome/fetchHomepage",
  async () => {
    const response = await axios.get(Api.frontend.home.homepage as string);

    return response.data;
  }
);

// Fetch Contact
export const fetchContact = createAsyncThunk(
  "frontHome/fetchContact",
  async () => {
    const response = await axios.get(Api.frontend.home.contact as string);

    return response.data;
  }
);

export const frontHomeSlice = createSlice({
  name: "frontHome",
  initialState,
  reducers: {
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menus = action.payload;
    });
    builder.addCase(fetchHomepage.fulfilled, (state, action) => {
      state.homepage = action.payload;
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.contact = action.payload;
    });
  },
});

export const { setCurrentMenu, setLanguage } = frontHomeSlice.actions;

export default frontHomeSlice.reducer;
