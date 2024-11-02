"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const TopNav = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/backend/logout");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "flex-end", bgcolor: "white" }}>
        <Box>
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
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
