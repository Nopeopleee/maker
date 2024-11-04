// React
import React from "react";

// Next.js
import { Metadata } from "next";

// MUI
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

// Config
import theme from "@/config/theme";

export const metadata: Metadata = {
  title: "為創而做 Maker - 後臺管理",
  description: "為創而做 Maker 是一個為創意而生的社群。",
};

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh-tw">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};
export default BackendLayout;
