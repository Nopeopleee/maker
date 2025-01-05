"use client";

// React
import { useEffect, useState } from "react";

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

// Config
import { initPage } from "@/config/page";

// Hooks
import useHome from "@/hooks/front/useHome";

// Interface
import { MenuItem as MenuItemInterface } from "@/interface/redux";

function Navbar() {
  const { menus, handleFetchMenu, handleChangeMenu } = useHome();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  useEffect(() => {
    handleFetchMenu();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (menu: MenuItemInterface) => {
    handleChangeMenu(menu);
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
            <Link href={"/"} onClick={() => handleChangeMenu(initPage)}>
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href={"/"}
              onClick={() => handleChangeMenu(initPage)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  ml: 2,
                  fontWeight: 700,
                }}
              >
                為創而做Maker
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {menus.map((menu) => (
              <Link
                key={menu.alias}
                href={`/${menu.alias}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  onClick={() => handleChangeMenu(menu)}
                >
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
                <MenuItem
                  key={menu.alias}
                  onClick={() => handleCloseNavMenu(menu)}
                >
                  <Link
                    href={`/${menu.alias}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
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
