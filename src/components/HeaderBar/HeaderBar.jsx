import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { InputAdornment, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const HeaderBar = ({ handleOpenCloseDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useUserContext();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <AppBar sx={{ flexGrow: 1, backgroundColor: "white" }} position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary.dark"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenCloseDrawer}
          >
            <MenuIcon sx={{ backgroundColor: "#F3F4F6" }} />
          </IconButton>
          <Typography
            // fontWeight={"bold"}
            color="grey.700"
            variant="h6"
            component="div"
            sx={{ mr: 2, maxWidth: 250, width: "100%" }}
          >
            Ágora TechSolutions
          </Typography>
          <Box
            sx={{
              width: "100%",
              mx: "auto",
              maxWidth: "1308px",
            }}
          >
            <TextField
              sx={{ backgroundColor: "#F3F4F6" }}
              size="small"
              fullWidth
              label="Buscar reparaciones, clientes ..."
              id="fullWidth"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <IconButton
            size="large"
            color="primary"
            aria-label="add to shopping cart"
            component={Link}
            to="/home/orders/create"
          >
            <AddCircleOutlineIcon sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton
            size="large"
            color="secondary.dark"
            aria-label="notifications"
          >
            <NotificationsNoneIcon />
          </IconButton>
          <Typography variant="body1" color="initial" sx={{ marginRight: 2 }}>
            {user?.nombre}
          </Typography>
          <IconButton
            sx={{ width: 20 }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="secondary.dark"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate("/admin")}>
              Administrar mi taller
            </MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
