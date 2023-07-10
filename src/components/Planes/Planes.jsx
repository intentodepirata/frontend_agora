import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const Planes = () => {
  const [showAnual, setShowAnual] = useState(false);

  const handleShowMensual = () => {
    setShowAnual(false);
  };

  const handleShowAnual = () => {
    setShowAnual(true);
  };

  const planData = [
    {
      name: "BÁSICO",
      price: showAnual ? "179.99€" : "19.99€",
      billing: showAnual ? " Euros / año" : " Euros / mes",
      features: [
        "Un centro de trabajo por cuenta",
        "Administración de reparaciones",
        "Administración de stock de componentes",
        "Administración de servicios",
        "Administración de clientes",
        "Administración de proveedores",
        "Soporte a usuarios",
      ],
      buttonLabel: "Comenzar prueba",
      buttonLink: "/login",
    },
    {
      name: "PRO",
      price: "¡Próximamente!",
      billing: "",
      features: [
        "De 1 a 5 centros de trabajo por cuenta",
        "Administración de reparaciones",
        "Administración de stock de componentes",
        "Administración de servicios",
        "Administración de clientes",
        "Administración de proveedores",
        "Soporte a usuarios",
        "Estadísticas",
        "Salud financiera",
        "Reportes de ventas diarios, semanales o mensuales",
      ],
      buttonLabel: "",
      buttonLink: "",
    },
  ];

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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {planData.map((plan, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              borderRadius: "4px",
              border: index === 0 ? "2px solid #0150F5" : "2px solid lightgrey",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
              <Typography variant="h5" component="h2" color="initial" mb={0.25}>
                {plan.name}
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
                <Box
                  component="span"
                  sx={{ fontSize: index === 1 && "2.4rem" }}
                >
                  {plan.price}

                  <Box component="span" sx={{ fontSize: "1rem" }}>
                    {plan.billing}
                  </Box>
                </Box>
                {index === 0 && (
                  <Box component="span" sx={{ fontSize: "1.5rem" }}>
                    Usuarios ilimitados
                  </Box>
                )}
              </Typography>
              {<Divider sx={{ mt: 2, mb: 2 }} />}
              {plan.features.map((feature, index) => (
                <Typography
                  key={index}
                  component="p"
                  variant="body1"
                  color="initial"
                  sx={{
                    mb: index === plan.features.length - 1 ? 5 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: { xs: "0.875rem", md: "1.4rem" },
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 20 }} color="primary" />
                  {feature}
                </Typography>
              ))}
              {index === 0 && (
                <Button
                  to={plan.buttonLink}
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
                  {plan.buttonLabel}
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Planes;
