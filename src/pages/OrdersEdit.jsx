import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { Link, useParams } from "react-router-dom";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
import useScrollUp from "../hooks/useScrollUp";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import DatosOrdenModal from "../components/DatosOrdenModal/DatosOrdenModal";
import { closeSnackbar, enqueueSnackbar } from "notistack";
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
import { initialValues } from "../components/FormOperacionesTecnicas/utils/initialValues";

const OrdersEdit = () => {
  const [fetchData, setFetchData] = useState(false);
  const [modal, setModal] = useState(false);
  const [entregada, setEntregada] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [order, setOrder] = useState(null);

  const { id } = useParams();
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  useScrollUp();

  // const fetchOt = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}ot/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const otData = await response.json();
  //       setUpdateCliente_id(otData.cliente_id);
  //       setAveria(otData.averia);
  //       setDescripcion(otData.descripcion);
  //       setObservaciones(otData.observaciones);
  //       setEstado_id(otData.estado_id);
  //       setChecklist_id(otData.checklist_id);
  //       setTipoGarantia(otData.tipoGarantia);
  //       setPrecio(otData.precio);
  //       setUpdatedDispositivo_id(otData.dispositivo_id);
  //     } else {
  //       console.error("Error al obtener los datos de la OT:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener los datos de la OT:", error);
  //   }
  // };
  // const fetchChecklist = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}checklist/${checklist_id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     if (!response.ok) {
  //       console.error("Error al obtener el checklist:");
  //       return;
  //     }

  //     setChecklist(data);
  //   } catch (error) {
  //     console.error("Error al obtener los estados:");
  //   }
  // };

  const queryPrintData = useQuery({
    queryKey: ["print data", id],
    queryFn: () => findOrderToPrint(id, user.token),

    onSuccess: (data) => setCliente(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const queryOrder = useQuery({
    queryKey: ["order", id],
    queryFn: () => findOrder(id, user.token),

    onSuccess: (data) => {
      setOrder(data.data);
      data.data.entregada === 1 && setEntregada(true);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const orderUpdateMutation = useMutation({
    mutationFn: (order) => updateOrder(id, order, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden actualizada correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["order", id]);
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

      queryClient.invalidateQueries(["order", id]);
    },
    onError: (error) => {
      console.error(error.message);
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
  // const handleGuardar = () => {
  //   setFetchData(true);
  // };
  function handlePrint() {
    window.open(`/print/${id}`);
  }
  const handleModal = () => {
    setModal((value) => !value);
  };

  const handleSubmit = (values) => {
    orderUpdateMutation.mutate(values);
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Guardar Orden
          </Button>
        </Stack>
      </Box>
      {modal && (
        <DatosOrdenModal modal={modal} handleModal={handleModal} id={id} />
      )}

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormOperacionesTecnicas
          fetchData={fetchData}
          setFetchData={setFetchData}
          entregada={entregada}
          order={order}
          orderUpdateMutation={orderUpdateMutation}
        />
      </Box>
    </Box>
  );
};

export default OrdersEdit;
