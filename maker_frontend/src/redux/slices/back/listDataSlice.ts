// React
import { type ReactNode } from "react";

// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchOptions = createAsyncThunk(
  "listData/fetchOptions",
  async (params: { list: keyof typeof Api.backend }) => {
    const response = await axios.get(`${Api.backend[params.list].options}`);

    return response.data;
  }
);

export const fetchData = createAsyncThunk(
  "listData/fetchData",
  async (params: { list: keyof typeof Api.backend; condition: object }) => {
    const response = await axios.get(`${Api.backend[params.list].index}`, {
      params: params.condition,
    });

    response.data.items.forEach((item: Item) => {
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
    });

    return response.data;
  }
);

// export const deleteData = createAsyncThunk(
//   "listData/deleteData",
//   async (
//     params: { list: keyof typeof Api.backend; ids: number[] },
//     { dispatch, getState }
//   ) => {
//     try {
//       const { list, ids } = params;
//       const response = await axios.delete(`${Api.backend[list].index}`, {
//         data: { ids },
//       });

//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

const listDataSlice = createSlice({
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
