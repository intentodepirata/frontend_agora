import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import {
  Task as TaskIcon,
  Inventory as InventoryIcon,
  PersonOutline as PersonOutlineIcon,
  LocalShipping as LocalShippingIcon,
  Build as BuildIcon,
  QueryStats as QueryStatsIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const Caracteristicas = () => {
  const [selectedFeature, setSelectedFeature] = useState("ordenes");

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  const featureData = [
    {
      id: "ordenes",
      label: "Órdenes",
      icon: <TaskIcon fontSize="3rem" />,
      content: [
        "Administra tus órdenes de trabajo",
        "Notifica a tus clientes el estado de sus reparaciones",
        "Crea las órdenes a tu medida",
        "Genera un QR para el seguimiento de las reparaciones",
      ],
    },
    {
      id: "inventarios",
      label: "Inventarios",
      icon: <InventoryIcon fontSize="3rem" />,
      content: [
        "Administra tus inventarios de una manera sencilla",
        "Todo el stock está sincronizado con las reparaciones",
        "Realiza nuevos pedidos desde tu inventario",
        "Conoce rápidamente los componentes que están sin stock",
      ],
    },
    {
      id: "clientes",
      label: "Clientes",
      icon: <PersonOutlineIcon fontSize="3rem" />,
      content: [
        "Gestión de contactos",
        "Personaliza el método de contacto por cliente",
        "Historial de clientes con número de reparaciones y fecha",
        "Fideliza a tus clientes ofreciéndoles descuentos personalizados",
      ],
    },
    {
      id: "proveedores",
      label: "Proveedores",
      icon: <LocalShippingIcon fontSize="3rem" />,
      content: [
        "Registra a tus proveedores",
        "Contacto directo con tus proveedores",
        "Enlace a su website, email o whatsapp",
      ],
    },
    {
      id: "servicios",
      label: "Servicios",
      icon: <BuildIcon fontSize="3rem" />,
      content: [
        "Personaliza las características de tu Servicio Técnico",
        "Agrega tus propios servicios",
        "Personaliza el tipo y coste del servicio",
        "Múltiples servicios para cada una de tus órdenes",
      ],
    },
    {
      id: "finanzas",
      label: "Finanzas",
      icon: <QueryStatsIcon fontSize="3rem" />,
      content: [
        "Realiza un cierre diario de caja con gastos e ingresos",
        "Consulta la evolución de tu negocio por fechas",
        "Consulta el tiempo de ejecución de cada una de tus reparaciones",
        "Consulta cuáles son los dispositivos más reparados y sus averías",
        "Obtén un reporte diario, semanal y mensual",
      ],
    },
  ];
  return (
    <Box id="caracteristicas" component="section" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        color="initial"
        sx={{ fontWeight: "700", textAlign: "center", my: 5 }}
      >
        Características
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          p: 1,
          mt: 10,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
            {featureData.map((feature) => (
              <Button
                key={feature.id}
                sx={{
                  m: 1,
                  px: 5,
                  py: 5,
                  textTransform: "none",
                  fontSize: "1.25rem",
                  placeContent: "center space-evenly",
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                  transition: "0.2s",
                  transform: selectedFeature === feature.id && "scale(1.05)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "primary",
                  },
                }}
                variant={
                  selectedFeature === feature.id ? "contained" : "disable"
                }
                color="primary"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.8rem",
                      sm: "2.5rem",
                      md: "3rem",
                    },
                  }}
                >
                  {feature.icon}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.5rem",
                      md: "1.6rem",
                    },
                  }}
                >
                  {feature.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ p: 4, m: 1 }} elevation={0}>
            {featureData.map(
              (feature) =>
                selectedFeature === feature.id && (
                  <Box key={feature.id}>
                    <Typography
                      paddingBottom={2}
                      fontWeight="700"
                      variant="h4"
                      color="primary"
                    >
                      {feature.label}
                    </Typography>
                    {feature.content.map((content, index) => (
                      <Typography
                        key={index}
                        marginBottom={1}
                        variant="h6"
                        color="textPrimary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                        {content}
                      </Typography>
                    ))}
                  </Box>
                )
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Caracteristicas;
