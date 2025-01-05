// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Config
import Api from "@/config/api";

// Axios
import axios from "axios";

// Interface
import { ContentState, HomeState } from "@/interface/redux";

const initContent = {
  title: "",
  subtitle: "",
  description: "",
  alias: "",
  image: "",
  text: "",
  created_at: "",
};

const initialState: ContentState = {
  contents: [],
  content: initContent,
};

// Fetch Content List
export const fetchContentList = createAsyncThunk(
  "frontContent/fetchContentList",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { frontHome: HomeState };
    const { alias } = state.frontHome.currentMenu;

    const response = await axios.get(
      `${Api.frontend.content.list as string}/${alias}`
    );

    return response.data;
  }
);

// Fetch Content
export const fetchContent = createAsyncThunk(
  "frontContent/fetchContent",
  async (alias: string) => {
    const response = await axios.get(`${Api.frontend.content.inner}/${alias}`);

    return response.data;
  }
);

export const frontContentSlice = createSlice({
  name: "frontHome",
  initialState,
  reducers: {
    clearContent: (state) => {
      state.contents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentList.fulfilled, (state, action) => {
        state.contents = action.payload;
      })
      .addCase(fetchContentList.rejected, (state) => {
        state.contents = [];
      });
    builder
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.content = initContent;
      });
  },
});

export const { clearContent } = frontContentSlice.actions;

export default frontContentSlice.reducer;
