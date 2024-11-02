"use client";

// Next.js
import Image from "next/image";

// MUI
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Slider
import Slider from "react-slick";

export default function Activity() {
  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box maxWidth="xl" margin="auto" padding={2} mt={4}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            variant="h4"
            color="primary.dark"
            align="center"
            sx={{ mt: 4, fontWeight: "bold" }}
          >
            最新消息
          </Typography>
        </Grid>
        <Grid
          maxWidth="md"
          margin="auto"
          size={{ xs: 12, md: 12 }}
          mt={{ xs: 4, md: 0 }}
        >
          <Slider {...sliderSettings}>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 1"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 1"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 2"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 3"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </Slider>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            variant="h4"
            color="primary.dark"
            align="center"
            sx={{ mt: 4, fontWeight: "bold" }}
          >
            活動報名
          </Typography>
        </Grid>
        <Grid
          maxWidth="md"
          margin="auto"
          size={{ xs: 12, md: 12 }}
          mt={{ xs: 4, md: 0 }}
        >
          <Slider {...sliderSettings}>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 1"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 1"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 2"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div>
              <Image
                src="https://placehold.jp/1920x1080.png"
                alt="Slide 3"
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
}
