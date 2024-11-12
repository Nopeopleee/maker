import { RootState } from "@/redux/store";
import { createSelector } from "reselect";
import { createSlice } from "@reduxjs/toolkit";

interface TableState {
  loading: boolean;
  updateTable: boolean;
  tablePage: number;
  rowsPerPage: number;
  orderBy: string;
  order: "asc" | "desc";
  tableSelected: number[];
}

const initialState: TableState = {
  loading: false,
  updateTable: false,
  tablePage: 0,
  rowsPerPage: 15,
  orderBy: "id",
  order: "desc",
  tableSelected: [],
};

export const selectTableState = createSelector(
  (state: RootState) => state.table,
  (table) => ({
    page: table.tablePage + 1,
    limit: table.rowsPerPage,
    orderBy: table.orderBy,
    sortOrder: table.order,
  })
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpdateTable: (state, action) => {
      state.updateTable = action.payload;
    },
    setTablePage: (state, action) => {
      state.tablePage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setTableSelected: (state, action) => {
      state.tableSelected = action.payload;
    },
    setTableInit: (state) => {
      state.tablePage = 0;
      state.orderBy = "id";
      state.order = "desc";
      state.tableSelected = [];
    },
  },
});

export const {
  setLoading,
  setUpdateTable,
  setTablePage,
  setRowsPerPage,
  setOrderBy,
  setOrder,
  setTableSelected,
} = tableSlice.actions;

export default tableSlice.reducer;
