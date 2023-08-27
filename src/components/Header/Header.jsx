import { Box, Button } from "@mui/material";
import logo from "../../assets/img/logo-trans.png";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      component="header"
      sx={{
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "960px",
          lg: "1280px",
          xl: "1440px",
          xxl: "1920px",
          xxxl: "2560px",
        },
        margin: "0 auto",
        p: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <RouterLink to="/" underline="none">
        <Box
          component={"img"}
          src={logo}
          alt="Agora Tech solutions"
          width={"160px"}
          height={"59px"}
        />
      </RouterLink>

      <Box
        component="nav"
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <a
          onClick={() => scrollToSection("caracteristicas")}
          style={{ cursor: "pointer" }}
        >
          Caracteristicas
        </a>
        <a
          onClick={() => scrollToSection("planes")}
          style={{ cursor: "pointer" }}
        >
          Precios
        </a>
        <RouterLink to="/login" underline="none">
          Iniciar Sesion
        </RouterLink>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/register"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Registrate
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
