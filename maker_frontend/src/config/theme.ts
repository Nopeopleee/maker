"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c7b299",
      dark: "#a0815f",
      light: "#f2e8db",
    },
    secondary: {
      main: "#f4f4f4",
    },
    warning: {
      main: "#f44336",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
});

export default theme;
