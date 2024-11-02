"use client";

// React
import React from "react";

// Next.js
import { useRouter } from "next/navigation";

// MUI
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

// config
import sideNav from "@/config/side-nav";

const drawerWidth = 240;

const SideNav = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          後臺管理
        </Typography>
        <List>
          {sideNav.map((item) => (
            <ListItemButton
              key={item.title}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>
                <Icon
                  icon={item.icon}
                  width="24"
                  height="24"
                  style={{ color: "#000" }}
                />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
