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
import MenuItem from "@mui/material/MenuItem";

// Config
import { initPage } from "@/config/page";

// Hooks
import useHome from "@/hooks/front/useHome";

// Interface
import { MenuItem as MenuItemInterface } from "@/interface/redux";

function Navbar() {
  const { menus, currentMenu, handleFetchMenu, handleChangeMenu } = useHome();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  useEffect(() => {
    handleFetchMenu();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (menu: MenuItemInterface) => {
    console.log("menu", menu);
    if (menu.alias) handleChangeMenu(menu);
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
              <Box
                key={menu.alias}
                sx={{
                  p: 1,
                  px: 2,
                  backgroundColor:
                    currentMenu.alias === menu.alias
                      ? "primary.dark"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    cursor: "pointer",
                  },
                  "&:not(:last-child)": {
                    borderRight: 1,
                    borderRightColor: "divider",
                    borderRightStyle: "solid",
                  },
                  color:
                    currentMenu.alias === menu.alias
                      ? "primary.light"
                      : "inherit",
                }}
                onClick={() => handleChangeMenu(menu)}
              >
                <Typography
                  sx={{
                    fontWeight: currentMenu.alias === menu.alias ? 500 : 600,
                    fontSize: "1.03rem",
                  }}
                >
                  {menu.title}
                </Typography>
              </Box>
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
                  <Typography sx={{ fontWeight: 700 }}>{menu.title}</Typography>
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
