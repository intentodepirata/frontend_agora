import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const HeaderBarAdmin = ({ handleOpenCloseDrawer }) => {
  const navigate = useNavigate();

  const { user } = useUserContext();

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <AppBar sx={{ flexGrow: 1, backgroundColor: "white" }} position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
          </Box>
          <Typography color="grey.700" variant="h5">
            Panel de Administración
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              navigate("/home");
            }}
          >
            Volver a Inicio
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBarAdmin;
