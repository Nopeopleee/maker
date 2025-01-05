"use client";

// React
import { useEffect } from "react";

// Mui
import { Box } from "@mui/material";

// Components
import Banner from "@/components/front/pages/Banner";
import AlbumInner from "@/components/front/pages/AlbumInner";
import ActivityInner from "@/components/front/pages/ActivityInner";
import NewsInner from "@/components/front/pages/NewsInner";

// Hooks
import useHome from "@/hooks/front/useHome";
import useContent from "@/hooks/front/useContent";

// Lib
import Helper from "@/lib/helper";

const InnerPage = () => {
  const validPages = [3, 4, 5];

  const { currentMenu } = useHome();
  const { handleFetchContent } = useContent();

  useEffect(() => {
    handleFetchContent();
  }, []);

  const renderPage = () => {
    switch (currentMenu.type) {
      case 3:
        return <NewsInner />;
      case 4:
        return <ActivityInner />;
      case 5:
        return <AlbumInner />;
      default:
        return null;
    }
  };

  return (
    <Box pb={4}>
      {validPages.includes(currentMenu.type) && (
        <Banner
          title={currentMenu.title}
          image={Helper.getFilePath(currentMenu.image)}
        />
      )}
      {renderPage()}
    </Box>
  );
};

export default InnerPage;
