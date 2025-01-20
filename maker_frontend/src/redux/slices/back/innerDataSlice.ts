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

interface ItemDetail {
  [key: string]: string | number | boolean;
}

interface innerDataState {
  itemDetail: ItemDetail | Array<ItemDetail>;
  options: object;
}

const initialState: innerDataState = {
  itemDetail: {},
  options: {},
};

// Fetch Options
export const fetchOptions = createAsyncThunk(
  "innerData/fetchOptions",
  async (list: keyof typeof Api.backend) => {
    const response = await axiosInstance.get(
      `${(Api.backend[list] as { options?: string })?.options}`
    );

    return response.data;
  }
);

// Save Data
export const saveData = createAsyncThunk(
  "innerData/saveData",
  async (
    params: { list: keyof typeof Api.backend; data: object },
    thunkAPI
  ) => {
    const { list, data } = params;
    try {
      const response = await axiosInstance.post(Api.backend[list].index, data);

      thunkAPI.dispatch(setMessage("新增成功"));
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

// Edit Data
export const editData = createAsyncThunk(
  "innerData/editData",
  async (params: { list: keyof typeof Api.backend; id: number }) => {
    const { list, id } = params;
    const response = await axiosInstance.get(
      Api.backend[list].index + `/${id}`
    );

    return response.data;
  }
);

// Update Data
export const updateData = createAsyncThunk(
  "innerData/updateData",
  async (
    params: {
      list: keyof typeof Api.backend;
      id: number;
      data: object;
    },
    thunkAPI
  ) => {
    const { list, id, data } = params;
    try {
      const response = await axiosInstance.patch(
        Api.backend[list].index + `/${id}`,
        data
      );
      thunkAPI.dispatch(setMessage("更新成功"));
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

export const innerDataSlice = createSlice({
  name: "innerData",
  initialState,
  reducers: {
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.fulfilled, (state, action) => {
      state.options = action.payload;
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.itemDetail = action.payload;
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.itemDetail = action.payload;
    });
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.itemDetail = action.payload;
    });
  },
});

export const { setItemDetail } = innerDataSlice.actions;

export default innerDataSlice.reducer;
