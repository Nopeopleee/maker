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

// Iconify
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
        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          borderRight: "1px solid #ddd",
          bgcolor: "primary.light",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <Typography variant="h6" align="center" sx={{ my: 2, fontWeight: 700 }}>
          後臺管理
        </Typography>
        <List>
          {sideNav.map((item) => (
            <ListItemButton
              key={item.title}
              onClick={() => handleNavigation(item.path)}
              sx={{
                margin: "8px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
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
