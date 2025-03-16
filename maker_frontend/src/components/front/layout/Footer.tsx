"use client";

// React
import React, { useEffect } from "react";

// MUI
import { Box, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Dayjs
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

// Hooks
import useHome from "@/hooks/front/useHome";
import Helper from "@/lib/helper";

function Footer() {
  const {
    menus,
    contact,
    handleFetchMenu,
    handleChangeMenu,
    handleFetchContact,
  } = useHome();

  useEffect(() => {
    handleFetchMenu();
    handleFetchContact();
  }, []);

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
          <Grid container spacing={6} size={{ xs: 12, md: 5 }}>
            {contact?.facebook_img && (
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link href={`${contact?.facebook || "/"}`} target="_blank">
                  <Image
                    src={Helper.getFilePath(contact?.facebook_img)}
                    alt="Facebook"
                    width={260}
                    height={32}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
              </Grid>
            )}
            {contact?.instagram_img && (
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link href={`${contact?.instagram || "/"}`} target="_blank">
                  <Image
                    src={Helper.getFilePath(contact?.instagram_img)}
                    alt="Instagram"
                    width={260}
                    height={32}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
              </Grid>
            )}
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Divider orientation="vertical" />
          </Grid>
          <Grid container size={{ xs: 12, md: 5 }} alignItems="center">
            {menus.map((menu) => (
              <Grid size={{ xs: 12, md: 3 }} key={menu.alias}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => handleChangeMenu(menu)}
                >
                  <Typography
                    variant="body1"
                    align="center"
                    color="black"
                    fontWeight={700}
                  >
                    {menu.title}
                  </Typography>
                </Box>
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
