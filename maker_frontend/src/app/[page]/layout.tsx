// Next.js
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

// Styles
import "../globals.css";

// Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Components
import Navbar from "@/components/front/layout/Navbar";
import Footer from "@/components/front/layout/Footer";
import ProgressBar from "@/components/common/ProgressBar";

// Mui
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Config
import theme from "@/config/theme";

// Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ProgressBar>
              <CssBaseline />
              <Navbar />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </ProgressBar>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
