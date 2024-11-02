"use client";

import { useParams } from "next/navigation";

// MUI
import { Box } from "@mui/material";

// Components
import Banner from "@/components/front/pages/Banner";
import About from "@/components/front/pages/About";
import Activity from "@/components/front/pages/Activity";
import Album from "@/components/front/pages/Album";
import Contact from "@/components/front/pages/Contact";
import NotFound from "@/components/error/404";
import Home from "@/components/front/home/home";

export default function FrontPage() {
  const params = useParams();
  const { page } = params;
  const validPages = ["about", "activity", "album", "contact"];

  const renderPage = (page: string) => {
    switch (page) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "activity":
        return <Activity />;
      case "album":
        return <Album />;
      case "contact":
        return <Contact />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Box>
      {validPages.includes(page as string) && (
        <Banner
          title={page as string}
          image={"https://placehold.jp/1920x324.png"}
        />
      )}
      {renderPage(page as string)}
    </Box>
  );
}
