import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { Link } from "react-router-dom";

const Planes = () => {
  const [showAnual, setShowAnual] = useState(false);

  const handleShowMensual = () => {
    setShowAnual(false);
  };
  const handleShowAnual = () => {
    setShowAnual(true);
  };

  return (
    <Box id="planes" component="section" py={8} px={1}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          mb: showAnual ? 2 : 14,
        }}
      >
        <Typography
          textAlign="center"
          variant="h3"
          component="h1"
          color="initial"
          sx={{ fontWeight: "700", mb: 5 }}
        >
          Elige tu plan
        </Typography>
        <Box
          sx={{
            mb: 2,
            mt: 1.5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleShowMensual}
            variant={showAnual ? "outlined" : "contained"}
            color="primary"
            sx={{
              borderRadius: "4px 0 0 4px",
              textTransform: "none",
              bg: "primary",
              boxShadow: 0,
              border: "2px solid #0150F5",
              py: 0.5,
              px: 3,
            }}
          >
            Mensual
          </Button>
          <Button
            onClick={handleShowAnual}
            variant={showAnual ? "contained" : "outlined"}
            color="primary"
            sx={{
              borderRadius: "0 4px 4px 0",
              textTransform: "none",
              bg: "primary",
              boxShadow: 0,
              border: "2px solid #0150F5",
              py: 0.5,
              px: 3,
            }}
          >
            Anual
          </Button>
        </Box>

        {showAnual && (
          <Typography variant="h5" color="initial" sx={{ mb: 8 }}>
            Ahorro de 3 meses
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "50%",
            borderRadius: "4px",
            border: "2px solid lightgrey",
            mx: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              color="initial"
              mb={0.25}
              textAlign="left"
            >
              BÁSICO
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              color="initial"
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Box component="span">
                {showAnual ? "179.99€" : "19.99€"}{" "}
                <Box component="span" sx={{ fontSize: "1rem" }}>
                  {showAnual ? " Euros / año" : " Euros / mes"}
                </Box>
              </Box>

              <Box component="span" sx={{ fontSize: " 1.5rem " }}>
                Usuarios ilimitados
              </Box>
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" /> Un
              centro de trabajo por cuenta
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de reparaciones
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de stock de componentes
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de servicios
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de clientes
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de proveedores
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 5,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" /> Soporte
              a usuarios
            </Typography>

            <Button
              to="/login"
              component={Link}
              variant="contained"
              color="primary"
              sx={{
                py: 1.5,
                mt: 5,
                textTransform: "none",
                fontSize: "1.125rem",
                fontWeight: "bold",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Comenzar prueba
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            borderRadius: "4px",
            border: "2px solid #0150F5",
            mx: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              color="initial"
              mb={0.25}
              textAlign="left"
            >
              PRO
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              color="initial"
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              ¡Próximamente!
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />
              De 1 a 5 centros de trabajo por cuenta
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de reparaciones
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de stock de componentes
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de servicios
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de clientes
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Administracion de proveedores
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" /> Soporte
              a usuarios
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />{" "}
              Estadisticas
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" /> Salud
              financiera
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="initial"
              sx={{
                mb: 5,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" /> Reportes
              de ventas diarios, semanales o mensuales
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Planes;
