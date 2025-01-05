"use client";

// MUI
import { Box } from "@mui/material";

// Components
import Banner from "@/components/front/pages/Banner";
import About from "@/components/front/pages/About";
import ContentList from "@/components/front/pages/ContentList";
import Album from "@/components/front/pages/Album";
import Contact from "@/components/front/pages/Contact";
import NotFound from "@/components/error/404";
import Home from "@/components/front/home/home";

// Hooks
import useHome from "@/hooks/front/useHome";

// Lib
import Helper from "@/lib/helper";

export default function FrontPage() {
  const validPages = [2, 3, 4, 5, 6];

  const { currentMenu } = useHome();

  const renderPage = () => {
    switch (currentMenu.type) {
      case 1:
        return <Home />;
      case 2:
        return <About />;
      case 3:
      case 4:
        return <ContentList />;
      case 5:
        return <Album />;
      case 6:
        return <Contact />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Box>
      {validPages.includes(currentMenu.type) && (
        <Banner
          title={currentMenu.title}
          image={Helper.getFilePath(currentMenu.image)}
        />
      )}
      {renderPage()}
    </Box>
  );
}
