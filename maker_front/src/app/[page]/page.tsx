"use client";

import { useParams } from "next/navigation";

// MUI
import { Box } from "@mui/material";

// Components
import Banner from "@/components/front/includes/Banner";
import About from "@/components/front/includes/About";
import Album from "@/components/front/includes/Album";
import Contact from "@/components/front/includes/Contact";

export default function about() {
  const params = useParams();
  const { page } = params;

  const renderPage = (page: string) => {
    switch (page) {
      case "about":
        return <About />;
      case "activity":
        return <h1>Activity</h1>;
      case "album":
        return <Album />;
      case "contact":
        return <Contact />;
      default:
        return <h1>404</h1>;
    }
  };

  return (
    <Box>
      <Banner />
      {renderPage(page as string)}
    </Box>
  );
}
