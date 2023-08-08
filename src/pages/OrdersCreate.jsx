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
import { addOrder } from "../api/orders";
import { useFormik } from "formik";

import { FormOrderSchema } from "../components/FormOperacionesTecnicas/utils/FormOrderSchema";
import { initialValues } from "../components/FormOperacionesTecnicas/utils/initialValues";
import { addChecklist, updateChecklist } from "../api/checklist";
const OrdersCreate = () => {
  const [step, setStep] = useState(-1);
  const [dispositivo_id, setDispositivo_id] = useState(null);
  const [cliente_id, setCliente_id] = useState(null);
  const [checklist_id, setChecklist_id] = useState(null);
  const [recepcionado, setRecepcionado] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  useScrollUp();

  useEffect(() => {
    if (cliente_id && dispositivo_id) {
      setRecepcionado(true);
      setStep((currentStatus) => currentStatus + 1);
    }
  }, [dispositivo_id, cliente_id]);

  const createCustomerMutation = useMutation({
    mutationFn: (values) => addCustomer(values, user.token),
    onSuccess: (data) => {
      setStep(0);
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
      setStep(1);
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

  const createOrderMutation = useMutation({
    mutationFn: (order) =>
      addOrder(
        { ...order, cliente_id, dispositivo_id, checklist_id },
        user.token
      ),
    onSuccess: () => {
      enqueueSnackbar("Orden creada correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const createChecklistMutation = useMutation({
    mutationFn: (values) => addChecklist(values, user.token),
    onSuccess: (data) => {
      setChecklist_id(data.data);
      enqueueSnackbar("Checklist creado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["order"]);
    },
  });

  const updateChecklistMutation = useMutation({
    mutationFn: (values) => updateChecklist(checklist_id, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Checklist actualizado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["order"]);
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
            createOrderMutation={createOrderMutation}
            createChecklistMutation={createChecklistMutation}
            updateChecklistMutation={updateChecklistMutation}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersCreate;
