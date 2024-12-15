"use client";

// React
import { useState } from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";

// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

// Hooks
import useHome from "@/hooks/front/useHome";

const pages = [
  { name: "關於我們", path: "about" },
  { name: "最新消息", path: "news" },
  { name: "活動報名", path: "activity" },
  { name: "活動相簿", path: "album" },
  { name: "聯絡我們", path: "contact" },
];

function Navbar() {
  const { menus } = useHome();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "primary.main",
        color: "black",
        boxShadow: 0,
        borderBottom: 1,
        borderBottomColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Link href={"/"}>
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </Link>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                ml: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href={"/"}>為創而做Maker</Link>
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {menus.map((menu) => (
              <Link key={menu.alias} href={`/${menu.alias}`}>
                <Button sx={{ my: 2, color: "black", display: "block" }}>
                  <Typography sx={{ fontWeight: 700 }}>{menu.title}</Typography>
                </Button>
              </Link>
            ))}
          </Box>

          {/* 手機板 */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {menus.map((menu) => (
                <MenuItem key={menu.alias} onClick={handleCloseNavMenu}>
                  <Link href={`/${menu.alias}`}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {menu.title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 2,
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            為創而做Maker
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
