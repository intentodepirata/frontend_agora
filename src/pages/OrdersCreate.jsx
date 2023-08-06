import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormClientes from "../components/FormClientes/FormClientes";
import FormDispositivo from "../components/FormDispositivo/FormDispositivo";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
import OrderStatusBar from "../components/OrderStatusBar/OrderStatusBar";
import useScrollUp from "../hooks/useScrollUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomer } from "../api/clientes";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../contexts/UserContext";
import { addDevice } from "../api/devices";
const OrdersCreate = () => {
  const [cliente_id, setCliente_id] = useState(null);
  const [estado, setEstado] = useState(-1);
  const [dispositivo_id, setDispositivo_id] = useState(null);
  const [recepcionado, setRecepcionado] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  useScrollUp();
  // useEffect(() => {
  //   if (cliente_id) {
  //     setEstado((currentStatus) => currentStatus + 1);
  //   }
  // }, [cliente_id]);
  // useEffect(() => {
  //   if (dispositivo_id) {
  //     setEstado((currentStatus) => currentStatus + 1);
  //   }
  // }, [dispositivo_id]);

  useEffect(() => {
    if (cliente_id && dispositivo_id) {
      setRecepcionado(true);
      setEstado((currentStatus) => currentStatus + 1);
    }
  }, [dispositivo_id, cliente_id]);

  const createCustomerMutation = useMutation({
    mutationFn: (values) => addCustomer(values, user.token),
    onSuccess: (data) => {
      setEstado(0);
      setCliente_id(data.data);
      enqueueSnackbar("Cliente agregado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const createDeviceMutation = useMutation({
    mutationFn: (values) => addDevice(values, user.token),
    onSuccess: (data) => {
      setEstado(1);
      setDispositivo_id(data.data);
      enqueueSnackbar("Dispositivo agregado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["devices"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

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

      <Box sx={{ py: 1, px: 2, my: 5 }}>
        <FormClientes createCustomerMutation={createCustomerMutation} />
      </Box>
      <Box sx={{ py: 1, px: 2, my: 5 }}>
        <FormDispositivo createDeviceMutation={createDeviceMutation} />
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
