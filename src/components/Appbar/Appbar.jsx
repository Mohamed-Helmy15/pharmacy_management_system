/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./Appbar.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logo.jpg";
import { items } from "../Sidebar/Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import axios from "axios";
const Appbar = () => {
  const out = () => {
    window.localStorage.clear();
    signOut();
    navigate("/");
  };
  const signOut = useSignOut();
  const navigate = useNavigate();

  const settings = ["Profile", "Logout"];
  const routSettings = ["Profile", ""];
  const routes = [
    "categories",
    "Users",
    "Customers",
    "Medicines",
    "Branches",
    "Bills",
    "",
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("tokens")}`,
    },
  };
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:1234/api/v1/users/`, config).then((res) => {
      res.data.payload.map((user) => {
        if (user.username === window.localStorage.getItem("user")) {
          setId(user.id);
        }
        return user.id;
      });
    });
  }, []);
  const getImgFromId = () => {
    axios
      .get(`http://localhost:1234/api/v1/users/${id}`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.payload.img !== undefined &&
          err.response.data.payload.img !== null
        ) {
          setImg(err.response.data.payload.img.split("\\").join("/"));
        }
      });
  };
  getImgFromId();
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <Typography
              variant="h6"
              sx={{
                cursor: "default",
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "white",
              }}
            >
              Pharmacy
            </Typography>

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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {items.map((item, i) => (
                  <MenuItem key={i} onClick={handleCloseNavMenu}>
                    <NavLink
                      style={{ fontWeight: "bold" }}
                      className={styles.links}
                      onClick={() => {
                        return item === "Logout" && out();
                      }}
                      to={`/${routes[i]}`}
                    >
                      {item}
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Pharmacy
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={window.localStorage.getItem("user")}
                    src={`http://localhost:1234/api/v1/users/load-file?file=${img}`}
                  />
                  <Typography
                    sx={{
                      marginLeft: "10px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {window.localStorage.getItem("user")}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <NavLink
                      style={{ fontWeight: "bold" }}
                      className={styles.links}
                      to={`/${routSettings[i]}`}
                      onClick={() => {
                        if (i === 1) {
                          out();
                        }
                      }}
                    >
                      {setting}
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Appbar;
