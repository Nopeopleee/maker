"use client";

// MUI
import { Box } from "@mui/material";

// Components
import Banner from "@/components/front/home/Banner";
import Activity from "@/components/front/home/Activity";
import About from "@/components/front/home/About";

// Hooks
import useHome from "@/hooks/front/useHome";

// Interface
import { Homepage } from "@/interface/redux";
import { useEffect } from "react";
import { HomeDetails } from "@/interface/page";

export default function Home() {
  const { homepage = [], handleFetchHomepage } = useHome();

  useEffect(() => {
    handleFetchHomepage();
  }, []);

  const renderBlock = (homepage: Homepage) => {
    const { type, home_details } = homepage;

    switch (type) {
      case 1:
        return (
          <Banner
            image_1={home_details?.image_1 as string}
            image_2={home_details?.image_2 as string}
          />
        );
      case 2:
        return <Activity />;
      case 3:
        return <About home_details={home_details as unknown as HomeDetails} />;
      default:
        return null;
    }
  };

  return (
    <Box pb={4} minHeight={"100vh"}>
      {homepage?.map((block, index) => {
        return <div key={index}>{renderBlock(block)}</div>;
      })}
    </Box>
  );
}
