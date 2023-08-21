import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormClientes from "../components/FormClientes/FormClientes";
import FormDispositivo from "../components/FormDispositivo/FormDispositivo";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
import OrderStatusBar from "../components/OrderStatusBar/OrderStatusBar";
import useScrollUp from "../hooks/useScrollUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCustomer } from "../api/customers";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../contexts/UserContext";
import { addDevice } from "../api/devices";
import {
  addOrder,
  findOrder,
  findOrderToPrint,
  updateOrder,
} from "../api/orders";
import { addChecklist, updateChecklist } from "../api/checklist";
const OrdersCreate = () => {
  const [step, setStep] = useState(-1);
  const [dispositivo_id, setDispositivo_id] = useState(null);
  const [cliente_id, setCliente_id] = useState(null);
  const [recepcionado, setRecepcionado] = useState(false);
  const [order, setOrder] = useState(null);
  const { user } = useUserContext();

  useScrollUp();

  useEffect(() => {
    if (cliente_id && dispositivo_id) {
      setRecepcionado(true);
      setStep((currentStatus) => currentStatus + 1);
    }
  }, [dispositivo_id, cliente_id]);

  const queryOrder = useQuery({
    queryKey: ["order", order?.id],
    queryFn: () => findOrderToPrint(order?.id, user.token),

    onSuccess: (data) => {
      setOrder(data.data);
    },
    onError: (error) => {
      console.error(error.message);
    },
    enabled: Boolean(order?.id),
  });

  const createCustomerMutation = useMutation({
    mutationFn: (values) => addCustomer(values, user.token),
    onSuccess: (data) => {
      setStep(0);
      setCliente_id(data.data.id);
      enqueueSnackbar("Cliente agregado correctamente", {
        variant: "success",
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const createDeviceMutation = useMutation({
    mutationFn: (values) => addDevice(values, user.token),
    onSuccess: (data) => {
      setStep(1);
      setDispositivo_id(data.data.id);
      enqueueSnackbar("Dispositivo agregado correctamente", {
        variant: "success",
      });
    },
    onError: (error) => console.error(error.message),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (values) => updateOrder(order?.id, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden actualizada correctamente", {
        variant: "success",
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const createChecklistMutation = useMutation({
    mutationFn: (values) => addChecklist(values, user.token),
  });

  const updateChecklistMutation = useMutation({
    mutationFn: (values) =>
      updateChecklist(order?.checklist?.id, values, user.token),
  });

  const createOrderMutation = useMutation({
    mutationFn: (values) =>
      addOrder(
        { ...values, customer: cliente_id, device: dispositivo_id },
        user.token
      ),
    onSuccess: (data) => {
      setOrder(data.data);
      enqueueSnackbar("Orden creada correctamente", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar("Falta completar el checklist", {
        variant: "error",
      });
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
      </Box>
      <Box sx={{ px: 2, my: 2, maxWidth: "1308px", mx: "auto" }}>
        <OrderStatusBar estado={step} />
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
            order={order}
            createOrderMutation={createOrderMutation}
            updateOrderMutation={updateOrderMutation}
            createChecklistMutation={createChecklistMutation}
            updateChecklistMutation={updateChecklistMutation}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersCreate;
