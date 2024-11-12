import { createSlice } from "@reduxjs/toolkit";

interface alertState {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const initialState: alertState = {
  open: false,
  message: "",
  severity: "info",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
  },
});

export const { setOpen, setMessage, setSeverity } = alertSlice.actions;

export default alertSlice.reducer;
