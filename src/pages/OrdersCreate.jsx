import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormClientes from "../components/FormClientes/FormClientes";
import FormDispositivo from "../components/FormDispositivo/FormDispositivo";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
import SearchCliente from "../components/SearchCliente/SearchCliente";
import SearchImei from "../components/SearchImei/SearchImei";
import OrderStatusBar from "../components/OrderStatusBar/OrderStatusBar";
const OrdersCreate = () => {
  const [cliente_id, setCliente_id] = useState(null);
  const [estado, setEstado] = useState(-1);
  const [dispositivo_id, setDispositivo_id] = useState(null);
  const [recepcionado, setRecepcionado] = useState(false);

  useEffect(() => {
    if (cliente_id) {
      setEstado((currentStatus) => currentStatus + 1);
    }
  }, [cliente_id]);
  useEffect(() => {
    if (dispositivo_id) {
      setEstado((currentStatus) => currentStatus + 1);
    }
  }, [dispositivo_id]);

  useEffect(() => {
    if (cliente_id && dispositivo_id) {
      setRecepcionado(true);
      setEstado((currentStatus) => currentStatus + 1);
    }
  }, [dispositivo_id, cliente_id]);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/home/orders" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Orden de trabajo
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar
        </Button>
      </Box>
      <Box sx={{ px: 2, my: 2, maxWidth: "1308px", mx: "auto" }}>
        <OrderStatusBar estado={estado} />
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <SearchCliente />
        <SearchImei />
      </Box> */}

      <Box sx={{ py: 1, px: 2, my: 5 }}>
        <FormClientes setCliente_id={setCliente_id} />
      </Box>
      <Box sx={{ py: 1, px: 2, my: 5 }}>
        <FormDispositivo setDispositivo_id={setDispositivo_id} />
      </Box>
      {recepcionado && (
        <Box sx={{ py: 1, px: 2, mx: "auto", my: 5 }}>
          <FormOperacionesTecnicas
            cliente_id={cliente_id}
            dispositivo_id={dispositivo_id}
            setEstado={setEstado}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersCreate;
