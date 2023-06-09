import { Box, Button, Typography } from "@mui/material";
import imagenHero from "../../assets/img/landing-hero.png";
import { Link } from "react-router-dom";

const ComenzarGratis = () => {
  return (
    <>
      <Box component="section">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              fontWeight="700"
              component="h1"
              variant="h3"
              color="initial"
            >
              El mejor software
            </Typography>
            <Typography component="h1" variant="h3" color="initial">
              para administrar
            </Typography>

            <Typography
              component="h1"
              variant="h3"
              color="primary"
              fontWeight="700"
              sx={{ pb: 2 }}
            >
              tu servicio técnico.
            </Typography>

            <Typography sx={{ fontSize: "1.25rem", color: "gray", mb: "32px" }}>
              Toma el control de tu negocio.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Button
                to="/login"
                component={Link}
                sx={{ textTransform: "none", fontSize: "1.25rem" }}
                variant="contained"
                color="primary"
                size="large"
              >
                Comenzar gratis
              </Button>
              <Typography fontWeight="bold" variant="body2" color="gray">
                PRUEBA GRATIS DE 30 DIAS
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "60%", py: 4 }}>
            <Box
              sx={{
                mx: "auto",
                width: "100%",
                height: "auto",
              }}
              component="img"
              src={imagenHero}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ComenzarGratis;
