"use client";

// MUI
import { Box, Divider } from "@mui/material";

// Components
import Banner from "@/components/front/home/Banner";
import Activity from "@/components/front/home/Activity";
import About from "@/components/front/home/About";

export default function Home() {
  return (
    <Box pb={4}>
      <Banner />
      <Activity />
      <Box maxWidth="xl" margin="auto" pt={2}>
        <Divider />
      </Box>
      <About />
    </Box>
  );
}
