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

// Lib
import Helper from "@/lib/helper";

interface Item {
  id: number;
  [key: string]: ReactNode;
}

interface ListDataState {
  options: object | string;
  items: Item[];
  dataCount: number;
  params: object;
}

const initialState: ListDataState = {
  options: {},
  items: [],
  dataCount: 0,
  params: {},
};

const createData = (item: Item) => {
  for (const key in item) {
    switch (key) {
      case "created_at":
      case "updated_at":
        item[key] = Helper.getFormattedDate(
          item[key] as string,
          "YYYY/MM/DD HH:mm"
        );
        break;
      default:
        break;
    }
  }
};

// Fetch Options
export const fetchOptions = createAsyncThunk(
  "listData/fetchOptions",
  async (list: keyof typeof Api.backend) => {
    const response = await axios.get(`${Api.backend[list].options}`);

    return response.data;
  }
);

// Fetch Data
export const fetchData = createAsyncThunk(
  "listData/fetchData",
  async (list: keyof typeof Api.backend, thunkApi) => {
    try {
      const state = thunkApi.getState() as { listData: ListDataState };
      const { params } = state.listData;

      const response = await axios.get(`${Api.backend[list]?.index}`, {
        params,
      });

      response.data.items?.forEach((item: Item) => {
        createData(item);
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteData = createAsyncThunk(
  "listData/deleteData",
  async (
    params: { list: keyof typeof Api.backend; ids: number[] },
    thunkAPI
  ) => {
    try {
      const { list, ids } = params;
      const response = await axios.delete(`${Api.backend[list].index}`, {
        data: { ids },
      });

      thunkAPI.dispatch(setMessage("刪除成功"));
      thunkAPI.dispatch(setSeverity("success"));
      thunkAPI.dispatch(setOpen(true));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        thunkAPI.dispatch(setMessage(error.response.data.message));
        thunkAPI.dispatch(setSeverity("error"));
        thunkAPI.dispatch(setOpen(true));
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        thunkAPI.dispatch(setMessage("An unknown error occurred"));
        thunkAPI.dispatch(setSeverity("error"));
        thunkAPI.dispatch(setOpen(true));
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const listDataSlice = createSlice({
  name: "listData",
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.params = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setDataCount: (state, action) => {
      state.dataCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.fulfilled, (state, action) => {
      state.options = action.payload;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.dataCount = action.payload.data_count;
    });
  },
});

export const { setParams, setItems, setDataCount } = listDataSlice.actions;

export default listDataSlice.reducer;
