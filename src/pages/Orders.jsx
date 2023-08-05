import { Box, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsOrders } from "../components/TablaGenerica/utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import MenuClickDerechoMain from "../components/MenuClickDerechoMain/MenuClickDerechoMain";
import { enqueueSnackbar } from "notistack";
import {
  notificarPorEmail,
  notificarPorWhatsApp,
} from "../components/BotonNotificar/utils/generarMensaje";
import {
  deleteOrder,
  findOrderToPrint,
  getOrders,
  updateOrderDeliver,
} from "../api/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useScrollUp();

  const queryOrders = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(user.token),
    onSuccess: (data) => setRows(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const handleDoubleClickModelChange = (row) => {
    navigate("/home/orders/edit/" + row.id);
  };

  function handlePrint(id) {
    handleClose();
    window.open(`/print/${id}`, "_blank");
  }
  function handleEditar(id) {
    handleClose();
    navigate("/home/orders/edit/" + id[0]);
  }

  const handleClose = () => {
    setContextMenu(null);
  };

  const deliverMutation = useMutation({
    mutationFn: (selectedRow) => updateOrderDeliver(selectedRow, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden entregada correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteOrder(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden eliminada correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders"]);
    },
  });
  const handleDeliver = (id) => {
    handleClose();
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
  const handleDelete = (id) => {
    handleClose();
    enqueueSnackbar("Desear Eliminar la Orden?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={deleteMutation}
        />
      ),
    });
  };

  //Funciones para el menu del click derecho

  async function avisarWhatsApp() {
    const { data } = await findOrderToPrint(selectedRow, user.token);
    notificarPorWhatsApp(data, user);
    handleClose();
  }
  async function avisarEmail() {
    const { data } = await findOrderToPrint(selectedRow, user.token);
    notificarPorEmail(data, user);
    handleClose();
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial" sx={{ p: 2 }}>
          Ordenes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/orders/create"
        >
          Crear orden
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Historial de reparaciones
      </Typography>
      <Box
        sx={{
          p: 2,
          height: 740,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <TablaGenerica
          columns={columnsOrders}
          rows={rows}
          cargando={queryOrders.isFetching}
          setSelectionModel={setSelectionModel}
          handleDoubleClickModelChange={handleDoubleClickModelChange}
          setSelectedRow={setSelectedRow}
          setContextMenu={setContextMenu}
          contextMenu={contextMenu}
        />
        <MenuClickDerechoMain
          contextMenu={contextMenu}
          handleClose={handleClose}
          entregar={() => handleDeliver(selectedRow)}
          avisarWhatsApp={avisarWhatsApp}
          avisarEmail={avisarEmail}
          imprimir={() => handlePrint(selectedRow)}
          editar={() => handleEditar([selectedRow])}
          eliminar={() => handleDelete(selectedRow)}
        />
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Button
            onClick={() => handleDelete(selectionModel)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
          <Button
            onClick={() => handleEditar(selectionModel)}
            variant="contained"
            endIcon={<EditNoteIcon />}
          >
            Editar
          </Button>
          <Button
            onClick={() => handlePrint(selectionModel)}
            variant="contained"
            endIcon={<PrintIcon />}
            color="success"
          >
            Imprimir
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Orders;
