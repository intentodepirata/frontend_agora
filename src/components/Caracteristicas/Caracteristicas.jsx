import { Box, Typography, Button, Paper } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useState } from "react";

const Caracteristicas = () => {
  const [showOrdenes, setShowOrdenes] = useState(true);
  const [showInventarios, setShowInventarios] = useState(false);
  const [showClientes, setShowClientes] = useState(false);
  const [showProveedores, setShowProveedores] = useState(false);
  const [showServicios, setShowServicios] = useState(false);
  const [showFinanzas, setShowFinanzas] = useState(false);

  const handleOrdenesClick = () => {
    setShowOrdenes(true);
    setShowInventarios(false);
    setShowClientes(false);
    setShowProveedores(false);
    setShowFinanzas(false);
    setShowServicios(false);
  };

  const handleInventariosClick = () => {
    setShowInventarios(true);
    setShowOrdenes(false);
    setShowClientes(false);
    setShowProveedores(false);
    setShowFinanzas(false);
    setShowServicios(false);
  };

  const handleClientesClick = () => {
    setShowClientes(true);
    setShowInventarios(false);
    setShowOrdenes(false);
    setShowProveedores(false);
    setShowFinanzas(false);
    setShowServicios(false);
  };

  const handleProveedoresClick = () => {
    setShowProveedores(true);
    setShowClientes(false);
    setShowInventarios(false);
    setShowOrdenes(false);
    setShowFinanzas(false);
    setShowServicios(false);
  };

  const handleServiciosClick = () => {
    setShowServicios(true);
    setShowProveedores(false);
    setShowClientes(false);
    setShowInventarios(false);
    setShowOrdenes(false);
    setShowFinanzas(false);
  };

  const handleFinanzasClick = () => {
    setShowFinanzas(true);
    setShowServicios(false);
    setShowProveedores(false);
    setShowClientes(false);
    setShowInventarios(false);
    setShowOrdenes(false);
  };

  return (
    <Box id="caracteristicas" component="section" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        color="initial"
        sx={{ fontWeight: "700", textAlign: "center", my: 4 }}
      >
        Caracteristicas
      </Typography>
      <Box sx={{ display: "flex", p: 1 }}>
        <Box sx={{ width: "50%" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr) " }}>
            <Button
              sx={{
                m: 1,
                p: 5,
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
                transform: showOrdenes && "scale(1.05)",
              }}
              variant={showOrdenes ? "contained" : "disable"}
              color="primary"
              onClick={handleOrdenesClick}
            >
              <TaskIcon sx={{ fontSize: "3rem" }} />
              Ordenes
            </Button>
            <Button
              sx={{
                m: 1,
                p: 5,
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
                transform: showInventarios && "scale(1.05)",
              }}
              variant={showInventarios ? "contained" : "disable"}
              color="primary"
              onClick={handleInventariosClick}
            >
              <InventoryIcon sx={{ fontSize: "3rem" }} />
              Inventarios
            </Button>
            <Button
              sx={{
                m: 1,
                p: 5,
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
                transform: showClientes && "scale(1.05)",
              }}
              variant={showClientes ? "contained" : "disable"}
              color="primary"
              onClick={handleClientesClick}
            >
              <PersonOutlineIcon sx={{ fontSize: "3rem" }} />
              Clientes
            </Button>
            <Button
              sx={{
                m: 1,
                p: 5,
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
                transform: showProveedores && "scale(1.05)",
              }}
              variant={showProveedores ? "contained" : "disable"}
              color="primary"
              onClick={handleProveedoresClick}
            >
              <LocalShippingIcon sx={{ fontSize: "3rem" }} />
              Proveedores
            </Button>
            <Button
              sx={{
                m: 1,
                p: 5,
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
                transform: showServicios && "scale(1.05)",
              }}
              variant={showServicios ? "contained" : "disable"}
              color="primary"
              onClick={handleServiciosClick}
            >
              <BuildIcon sx={{ fontSize: "3rem" }} />
              Servicios
            </Button>
            <Button
              sx={{
                m: 1,
                p: 5,
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
                transform: showFinanzas && "scale(1.05)",
              }}
              variant={showFinanzas ? "contained" : "disable"}
              color="primary"
              onClick={handleFinanzasClick}
            >
              <QueryStatsIcon sx={{ fontSize: "3rem" }} />
              Finanzas
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Paper
            sx={{ p: 4, m: 1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
          >
            {showOrdenes && (
              <Box>
                <Typography
                  paddingBottom={2}
                  fontWeight="700"
                  variant="body1"
                  color="textPrimary"
                >
                  Ordenes de trabajo
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Administra tus ordenes de trabajo
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Notifica a tus clientes el estado de sus reparaciones
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Crea las ordenes a tu medida
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Agrega fotos de las reparaciones
                </Typography>
              </Box>
            )}
            {showInventarios && (
              <Box>
                <Typography
                  paddingBottom={2}
                  fontWeight="700"
                  variant="body1"
                  color="textPrimary"
                >
                  Inventario
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Administra tus inventarios de una manera sencilla
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Se actualiza a la par de las órdenes
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Inventario por cada centro de trabajo
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Programa la realizacion de tus inventarios
                </Typography>
              </Box>
            )}
            {showClientes && (
              <Box>
                <Typography
                  paddingBottom={2}
                  fontWeight="700"
                  variant="body1"
                  color="textPrimary"
                >
                  Clientes
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Gestión de contactos.
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Personaliza el metodo de contacto por cliente.
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Historial de clientes
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Fideliza a tus clientes ofreciendoles descuentos
                  personalizados
                </Typography>
              </Box>
            )}
            {showProveedores && (
              <Box>
                <Typography
                  paddingBottom={2}
                  fontWeight="700"
                  variant="body1"
                  color="textPrimary"
                >
                  Proveedores
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Registra a tus proveedores, son una parte importante en el
                  proceso de reparacion
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Guarda al instante un nuevo proveedor que encontraste
                </Typography>
              </Box>
            )}
            {showServicios && (
              <Box>
                <Typography
                  paddingBottom={2}
                  fontWeight="700"
                  variant="body1"
                  color="textPrimary"
                  sx={{ fontWeight: "bolder" }}
                >
                  Servicios
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Lleva un registro de todas tus reparaciones
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Agrega tus propios serivios
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Multiples servicios para cada una de tus ordenes
                </Typography>
              </Box>
            )}
            {showFinanzas && (
              <Box>
                <Typography
                  paddingBottom={2}
                  fontWeight="700"
                  variant="body1"
                  color="textPrimary"
                  sx={{ fontWeight: "bolder" }}
                >
                  Finanzas
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Administra los resultados de tu negocio
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Registra todos tus ingresos y gastos
                </Typography>
                <Typography
                  marginBottom={1}
                  marginLeft={1}
                  variant="body2"
                  color="textPrimary"
                >
                  - Obten un reporte diario, semanal y mensual
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Caracteristicas;
