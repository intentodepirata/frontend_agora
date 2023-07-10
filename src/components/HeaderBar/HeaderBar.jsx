import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  CircularProgress,
  ClickAwayListener,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useDebounce } from "use-debounce";
import useScrollUp from "../../hooks/useScrollUp";

const HeaderBar = ({ handleOpenCloseDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 1000);
  const [searchResults, setSearchResults] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useScrollUp();

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

  useEffect(() => {
    if (value !== "") {
      handleSearch();
    }
  }, [value]);
  const handleSearch = async () => {
    const url = `${import.meta.env.VITE_API_URL}ot/search/${value}`;
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      if (data.length === 0) {
        searchResults([]);
        setIsLoading(false);
        return;
      }
      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }

    setDialogOpen(true);
  };
  const handleClick = (id) => {
    navigate(`/home/orders/edit/${id}`);
    setDialogOpen(false);
  };
  const handleOpenDialog = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSearchResults([]);
    setSearchText("");
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
            color="grey.700"
            variant="h6"
            component="div"
            sx={{ mr: 2, maxWidth: 250, width: "100%" }}
          >
            {user.negocio?.nombre
              ? user.negocio?.nombre
              : "Agora TechSolutions"}
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
              autoComplete="off"
              label="Buscar reparaciones, clientes ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onClick={handleOpenDialog}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleOpenDialog}>
                      <SearchIcon />
                    </IconButton>
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
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ mt: 6 }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem onClick={() => navigate("/admin")}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Administrar mi taller
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar sesion
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {dialogOpen && (
        <ClickAwayListener onClickAway={handleCloseDialog}>
          <Slide direction="down" in={dialogOpen} mountOnEnter unmountOnExit>
            <Paper
              sx={{
                position: "absolute",
                top: "40px",
                left: {
                  xxxl: "34.5%",
                  xxl: "26.7%",
                  xl: "18.9%",
                  lg: "26.5%",
                },
                right: 0,
                maxWidth: "1300px",
                width: { lg: "55.5%", xl: "100%", xxl: "100%" },
                bgcolor: "#F3F4F6",
                height: "auto",
                zIndex: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                overflow: "scroll",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  mt: 5,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "grey.600",
                  pb: 0,
                }}
              >
                {searchResults.length > 0
                  ? `Resultados de búsqueda (${searchResults.length})`
                  : "No hay resultados"}
              </Typography>

              {isLoading ? (
                <CircularProgress sx={{ mt: 5, mb: 5 }} />
              ) : (
                <List>
                  {searchResults.length > 0 &&
                    searchResults.map((item) => (
                      <Box key={item.ot_id}>
                        <ListItemButton onClick={() => handleClick(item.ot_id)}>
                          <ListItemText
                            primary={`OT${item.ot_id} - ${item.nombre_cliente} -  ${item.nombre_modelo} - IMEI: ${item.imei}`}
                          />
                        </ListItemButton>
                        <Divider />
                      </Box>
                    ))}
                </List>
              )}
            </Paper>
          </Slide>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default HeaderBar;
