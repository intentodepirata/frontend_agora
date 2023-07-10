import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Paper, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ListBar({ showDrawer }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Paper
      sx={{
        marginTop: 0.5,
        width: "100%",
        maxWidth: showDrawer ? "16rem" : "64px",
        bgcolor: "background.paper",
        position: "fixed",
        height: "100vh",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0);
            navigate("/home");
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        <Divider />
        <Typography
          sx={{ p: "8px 40px", mt: 1 }}
          variant="body2"
          color="inherit"
        >
          {showDrawer && "MI TALLER"}
        </Typography>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => {
            handleListItemClick(event, 1);
            navigate("/home/orders");
          }}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Ordenes" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => {
            handleListItemClick(event, 2);
            navigate("/home/products");
          }}
        >
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Inventario" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => {
            handleListItemClick(event, 3);
            navigate("/home/clientes");
          }}
        >
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => {
            handleListItemClick(event, 4);
            navigate("/home/suppliers");
          }}
        >
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary="Proveedores" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => {
            handleListItemClick(event, 5);
            navigate("/home/services");
          }}
        >
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Servicios" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => {
            handleListItemClick(event, 6);
            navigate("/home/stats");
          }}
        >
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="Estadisticas" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 7}
          onClick={(event) => {
            handleListItemClick(event, 7);
            navigate("/home/treasury");
          }}
        >
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Tesoreria" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 8}
          onClick={(event) => {
            handleListItemClick(event, 8);
            navigate("/admin/permisos");
          }}
          sx={{ bottom: "1rem", position: " fixed" }}
        >
          <ListItemIcon>
            <ForwardToInboxIcon />
          </ListItemIcon>
          <ListItemText primary={showDrawer ? "Invitar a mi equipo" : ""} />
        </ListItemButton>
      </List>
    </Paper>
  );
}
