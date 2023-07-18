import { Box, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsOrders } from "../components/TablaGenerica/utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import MenuClickDerechoMain from "../components/MenuClickDerechoMain/MenuClickDerechoMain";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import {
  notificarPorEmail,
  notificarPorWhatsApp,
} from "../components/BotonNotificar/utils/generarMensaje";
const Orders = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [updateClientes, setUpdateClientes] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();
  useScrollUp();

  useEffect(() => {
    const fetchOts = async () => {
      try {
        setCargando(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}ot/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        setRows(data);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener las ots:", error);
      }
    };
    fetchOts();
  }, [updateClientes]);
  const fetchEntregar = async (id, snackbarId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/deliver/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (!data) {
        throw new Error("Error al entregar la Orden");
      }
      setUpdateClientes(() => !updateClientes);
      closeSnackbar(snackbarId);
      enqueueSnackbar("Orden entregada correctamente", {
        variant: "success",
      });
    } catch (error) {
      closeSnackbar(snackbarId);
      console.error("Error al entregar la Orden:");
    }
  };
  const fetchCliente = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/print/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al obtener al cliente");
    }
  };
  const handleDoubleClickModelChange = (row) => {
    navigate("/home/orders/edit/" + row.id);
  };

  function handlePrint(id) {
    window.open(`/print/${id}`, "_blank");
    handleClose();
  }
  function handleEditar(id) {
    navigate("/home/orders/edit/" + id[0]);
    handleClose();
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
    handleClose();
  }

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleEntregar = (id) => {
    handleClose();
    console.log(id);
    enqueueSnackbar("Desear entregar el terminal al Cliente?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => fetchEntregar(id, snackbarId)}
            color="primary"
          >
            Confirmar
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Cancelar
          </Button>
        </Stack>
      ),
    });
  };

  //Funciones para el menu del click derecho

  async function avisarWhatsApp() {
    const cliente = await fetchCliente(selectedRow);
    notificarPorWhatsApp(cliente, user);
    handleClose();
  }
  async function avisarEmail() {
    const cliente = await fetchCliente(selectedRow);
    notificarPorEmail(cliente, user);
    handleClose();
  }

  function eliminar() {
    console.log("eliminando", selectedRow);
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
          cargando={cargando}
          setSelectionModel={setSelectionModel}
          handleDoubleClickModelChange={handleDoubleClickModelChange}
          setSelectedRow={setSelectedRow}
          setContextMenu={setContextMenu}
          contextMenu={contextMenu}
        />
        <MenuClickDerechoMain
          contextMenu={contextMenu}
          handleClose={handleClose}
          entregar={() => handleEntregar(selectedRow)}
          avisarWhatsApp={avisarWhatsApp}
          avisarEmail={avisarEmail}
          imprimir={() => handlePrint(selectedRow)}
          editar={() => handleEditar([selectedRow])}
          eliminar={eliminar}
        />
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Button
            onClick={() => handleEliminar(selectionModel)}
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
