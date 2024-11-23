"use client";

// React
import React, { useEffect, useState } from "react";

// MUI
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Icon } from "@iconify/react/dist/iconify.js";

// lib
import { removeToken } from "@/lib/auth";

const TopNav = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleViewFrontend = () => {
    window.open("/", "_blank");
  };

  const handleLogout = () => {
    removeToken();
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "primary.light",
        }}
      >
        <Box>
          <Typography variant="h6">Hi, {user?.name}</Typography>
        </Box>
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
