// Next.js
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

// Styles
import "./globals.css";

// Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mui
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Config
import theme from "@/config/theme";

export const metadata: Metadata = {
  title: "為創而做 Maker",
  description: "為創而做 Maker 是一個為創意而生的社群。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-tw">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
