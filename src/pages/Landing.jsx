import ComenzarGratis from "../components/ComenzarGratis/ComenzarGratis";
import Caracteristicas from "../components/Caracteristicas/Caracteristicas";
import Planes from "../components/Planes/Planes";
import { Box } from "@mui/material";
import useScrollUp from "../hooks/useScrollUp";

const Landing = () => {
  useScrollUp();
  return (
    <Box
      component="main"
      sx={{
        margin: "0 auto",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "960px",
          lg: "1280px",
          xl: "1440px",
          xxl: "1920px",
          xxxl: "2560px",
        },
        p: 2,
      }}
    >
      <ComenzarGratis />
      <Caracteristicas />
      <Planes />
    </Box>
  );
};

export default Landing;
