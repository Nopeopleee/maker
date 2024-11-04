"use client";

// React
import React from "react";

// Next.js
import { useRouter } from "next/navigation";

// MUI
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Icon } from "@iconify/react/dist/iconify.js";

const TopNav = () => {
  const router = useRouter();

  const handleViewFrontend = () => {
    window.open("/", "_blank");
  };

  const handleLogout = () => {
    router.push("/backend/logout");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "flex-end", bgcolor: "white" }}>
        <Box>
          <Button
            color="inherit"
            startIcon={<Icon icon="carbon:screen" />}
            onClick={handleViewFrontend}
          >
            前台
          </Button>
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            登出
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
