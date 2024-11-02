// React
import React from "react";

// MUI
import { Box, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Dayjs
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { name: "關於我們", path: "/about" },
  { name: "最新消息", path: "/news" },
  { name: "活動報名", path: "/activity" },
  { name: "活動相簿", path: "/album" },
  { name: "聯絡我們", path: "/contact" },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "black",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid container spacing={4} size={{ xs: 12, md: 5 }}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Link href="#facebook">
                <Image
                  src="/assets/images/fblogo.png"
                  alt="Facebook"
                  width={260}
                  height={32}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Link href="#instagram">
                <Image
                  src="/assets/images/iglogo.png"
                  alt="Instagram"
                  width={260}
                  height={32}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Divider orientation="vertical" />
          </Grid>
          <Grid
            container
            spacing={4}
            size={{ xs: 12, md: 5 }}
            alignItems="center"
          >
            {menuItems.map((item) => (
              <Grid size={{ xs: 12, md: 3 }} key={item.path}>
                <Link href={item.path}>
                  <Typography
                    variant="body1"
                    align="center"
                    color="black"
                    fontWeight={700}
                  >
                    {item.name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }} color="gray">
          © {dayjs().year()} 為創而做 Maker All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
