import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Paper, Typography } from "@mui/material";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StoreIcon from "@mui/icons-material/Store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import { useUserContext } from "../../contexts/UserContext";
import { ROLES } from "../../constants/ROLES";

export default function ListBarAdmin({ showDrawer }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate();
  const { user } = useUserContext();

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
        <Typography
          sx={{ mt: 2, mb: 2 }}
          textAlign={"center"}
          variant="body2"
          color="grey.600"
          fontSize={"12px"}
          fontWeight={"bold"}
        >
          {showDrawer && "ADMINISTRAR MI NEGOCIO"}
        </Typography>

        {user.role !== ROLES.IMPAGADO && (
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handleListItemClick(event, 1);
              navigate("/admin");
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={showDrawer ? "Mi negocio" : ""} />
          </ListItemButton>
        )}

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => {
            handleListItemClick(event, 2);
            navigate("/admin/suscripcion");
          }}
        >
          <ListItemIcon>
            <LocalMallIcon />
          </ListItemIcon>
          <ListItemText primary={showDrawer ? "Mi suscripcion" : ""} />
        </ListItemButton>

        {user.role !== ROLES.IMPAGADO && (
          <>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3);
                navigate("/admin/permisos");
              }}
            >
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary={showDrawer ? "Usuarios y permisos" : ""} />
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4);
                navigate("/admin/centros");
              }}
            >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary={showDrawer ? "Centros de trabajo" : ""} />
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => {
                handleListItemClick(event, 5);
                navigate("/admin/notificaciones");
              }}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary={showDrawer ? "Notificaciones" : ""} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => {
                handleListItemClick(event, 6);
                navigate("/admin/plantillas");
              }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={showDrawer ? "Politicas y plantillas" : ""}
              />
            </ListItemButton>
            <Typography
              sx={{ my: 2 }}
              textAlign={"center"}
              variant="body2"
              color="grey.600"
              fontSize={"12px"}
              fontWeight={"bold"}
            >
              {showDrawer && "ADMINISTRAR MI CUENTA"}
            </Typography>
            <ListItemButton
              selected={selectedIndex === 7}
              onClick={(event) => {
                handleListItemClick(event, 7);
                navigate("/admin/mis-datos");
              }}
            >
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary={showDrawer ? "Mis datos" : ""} />
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 8}
              onClick={(event) => {
                handleListItemClick(event, 8);
                navigate("/admin/seguridad");
              }}
            >
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary={showDrawer ? "Seguridad" : ""} />
            </ListItemButton>
          </>
        )}
        <ListItemButton
          selected={selectedIndex === 9}
          onClick={(event) => handleListItemClick(event, 9)}
          sx={{ bottom: "1rem", position: " fixed" }}
        >
          <ListItemIcon>
            <ForwardToInboxIcon />
          </ListItemIcon>
          <ListItemText primary={showDrawer ? "Contactar con soporte" : ""} />
        </ListItemButton>
      </List>
    </Paper>
  );
}
