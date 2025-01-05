"use client";

// Next.js
import Image from "next/image";

// MUI
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Interface
import { HomeAbout } from "@/interface/page";

// Lib
import Helper from "@/lib/helper";

export default function About(props: HomeAbout) {
  const { home_details } = props;

  return (
    <Box maxWidth="xl" margin="auto">
      <Grid container spacing={2} justifyContent="center">
        <Grid size={12}>
          <Typography
            variant="h4"
            color="primary.dark"
            align="center"
            sx={{ mt: 4, fontWeight: "bold" }}
          >
            {home_details.title}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1" align="center">
            {home_details.subtitle}
          </Typography>
        </Grid>
        <Grid
          maxWidth="xl"
          margin="auto"
          container
          spacing={6}
          size={12}
          mt={4}
          display={{ xs: "block", md: "flex" }}
          justifyContent={{ xs: "center", md: "space-around" }}
          width={{ xs: "100%", md: "auto" }}
        >
          <Grid size={4} maxWidth={360}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={360}
              height={360}
            >
              <Image
                src={Helper.getFilePath(home_details.image_1)}
                alt="Mission"
                width={360}
                height={360}
                priority
                unoptimized
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              align="center"
              mt={2}
              color="primary.dark"
              style={{ fontWeight: "bold" }}
            >
              {home_details.link_1}
            </Typography>
            <Typography variant="body1" align="center">
              {home_details.content_1}
            </Typography>
          </Grid>
          <Grid size={4} maxWidth={360}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={360}
              height={360}
            >
              <Image
                src={Helper.getFilePath(home_details.image_2)}
                alt="Mission"
                width={360}
                height={360}
                priority
                unoptimized
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              align="center"
              mt={2}
              color="primary.dark"
              style={{ fontWeight: "bold" }}
            >
              {home_details.link_2}
            </Typography>
            <Typography variant="body1" align="center">
              {home_details.content_2}
            </Typography>
          </Grid>
          <Grid size={4} maxWidth={360}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={360}
              height={360}
            >
              <Image
                src={Helper.getFilePath(home_details.image_3)}
                alt="Mission"
                width={360}
                height={360}
                priority
                unoptimized
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              align="center"
              mt={2}
              color="primary.dark"
              style={{ fontWeight: "bold" }}
            >
              {home_details.link_3}
            </Typography>
            <Typography variant="body1" align="center">
              {home_details.content_3}
            </Typography>
          </Grid>
        </Grid>
        <Grid size={12} maxWidth={720} mt={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={720}
            height={540}
          >
            <Image
              src={Helper.getFilePath(home_details.image_4)}
              alt="Mission"
              width={720}
              height={540}
              priority
              unoptimized
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography variant="body1" align="center" mt={2} lineHeight={2}>
            {home_details.content_4}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
