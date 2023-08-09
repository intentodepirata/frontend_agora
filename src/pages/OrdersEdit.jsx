import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { Link, useParams } from "react-router-dom";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
import useScrollUp from "../hooks/useScrollUp";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import DatosOrdenModal from "../components/DatosOrdenModal/DatosOrdenModal";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../contexts/UserContext";
import BotonNotificar from "../components/BotonNotificar/BotonNotificar";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  findOrder,
  findOrderToPrint,
  updateOrder,
  updateOrderDeliver,
} from "../api/orders";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";
import { updateChecklist } from "../api/checklist";

const OrdersEdit = () => {
  const [modal, setModal] = useState(false);
  const [entregada, setEntregada] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  useScrollUp();

  const queryPrintData = useQuery({
    queryKey: ["print data"],
    queryFn: () => findOrderToPrint(id, user.token),

    onSuccess: (data) => setCliente(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const queryOrder = useQuery({
    queryKey: ["order"],
    queryFn: () => findOrder(id, user.token),

    onSuccess: (data) => {
      setOrder(data.data);
      data.data.entregada === 1 && setEntregada(true);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: (order) => updateOrder(id, order, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden actualizada correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const deliverMutation = useMutation({
    mutationFn: () => updateOrderDeliver(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden entregada correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  const updateChecklistMutation = useMutation({
    mutationFn: (values) =>
      updateChecklist(order?.order.checklist_id, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Checklist actualizado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["order"]);
    },
  });

  const handleDeliver = (id) => {
    enqueueSnackbar("Desear entregar el terminal al Cliente?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={deliverMutation}
        />
      ),
    });
  };

  function handlePrint() {
    window.open(`/print/${id}`);
  }
  const handleModal = () => {
    setModal((value) => !value);
  };

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
            Editar Orden
          </Typography>
        </Box>
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
          spacing={2}
        >
          <Button
            onClick={() => handleModal()}
            variant="contained"
            endIcon={<PlagiarismIcon />}
            color="warning"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Datos Orden
          </Button>

          <BotonNotificar cliente={cliente} />

          {!entregada && (
            <Button
              onClick={() => handleDeliver()}
              variant="contained"
              endIcon={<DoneAllRoundedIcon />}
              color="success"
              sx={{ textTransform: "none", fontSize: "16px" }}
              disabled={entregada}
            >
              Entregar
            </Button>
          )}
          <Button
            onClick={() => handlePrint()}
            variant="contained"
            endIcon={<PrintIcon />}
            color="success"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Imprimir
          </Button>
        </Stack>
      </Box>
      {modal && (
        <DatosOrdenModal modal={modal} handleModal={handleModal} id={id} />
      )}

      {order && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <FormOperacionesTecnicas
            order={order}
            updateOrderMutation={updateOrderMutation}
            updateChecklistMutation={updateChecklistMutation}
            entregada={entregada}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersEdit;
