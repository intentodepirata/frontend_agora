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
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              fontWeight="700"
              component="h1"
              variant="h2"
              color="initial"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                  xl: "4rem",
                  xxl: "4.5rem",
                  xxxl: "5rem",
                },
              }}
            >
              El mejor software
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              color="initial"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                  xl: "4rem",
                  xxl: "4.5rem",
                  xxxl: "5rem",
                },
              }}
            >
              para administrar
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              fontWeight="700"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                  xl: "4rem",
                  xxl: "4.5rem",
                  xxxl: "5rem",
                },
                paddingBottom: 2,
              }}
            >
              tu servicio técnico.
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                  md: "1.5rem",
                  lg: "1.75rem",
                  xl: "2rem",
                  xxl: "2.25rem",
                  xxxl: "2.5rem",
                },
                color: "gray",
                marginBottom: "32px",
              }}
            >
              Toma el control de tu negocio.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
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
          <Box sx={{ width: "100%", py: 4 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // marginLeft: "200px",
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
