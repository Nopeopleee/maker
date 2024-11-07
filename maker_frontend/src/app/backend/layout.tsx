// React
import React from "react";

// Next.js
import { Metadata } from "next";

// MUI
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Config
import theme from "@/config/theme";

// Redux
import { Providers } from "@/redux/provider";

export const metadata: Metadata = {
  title: "為創而做 Maker - 後臺管理",
  description: "為創而做 Maker 是一個為創意而生的社群。",
};

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html lang="zh-Hant-TW">
        <body
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
};
export default BackendLayout;
