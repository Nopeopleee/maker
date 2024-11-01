"use client";

// Next.js
import { useParams } from "next/navigation";

// Mui
import { Box } from "@mui/material";

// Components
import Banner from "@/components/front/includes/Banner";
import AlbumInner from "@/components/front/includes/AlbumInner";
import NotFound from "@/components/error/404";
import ActivityInner from "@/components/front/includes/ActivityInner";

const InnerPage = () => {
  const params = useParams();
  const { page, alias } = params;
  const validPages = ["activity", "album"];

  const renderPage = (page: string, alias: string) => {
    switch (page) {
      case "activity":
        return <ActivityInner />;
      case "album":
        return <AlbumInner />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Box pb={4}>
      {validPages.includes(page as string) && (
        <Banner
          title={alias as string}
          image={"https://placehold.jp/1920x324.png"}
        />
      )}
      {renderPage(page as string, alias as string)}
    </Box>
  );
};

export default InnerPage;
