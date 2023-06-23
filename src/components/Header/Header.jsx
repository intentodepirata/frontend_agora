import { Box, Button } from "@mui/material";

import logo from "../../assets/img/logo-trans.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Box
        component="header"
        sx={{
          maxWidth: "1440px",
          margin: "0 auto",

          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" underline="none">
          <Box
            component={"img"}
            src={logo}
            alt="Agora Tech solutions"
            sx={{ width: "160px" }}
          />
        </Link>

        <Box
          component="nav"
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <a href="/#caracteristicas">Caracteristicas</a>
          <a href="/#planes">Precios</a>
          <Link to="/login" underline="none">
            Iniciar Sesion
          </Link>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Registrate
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;
