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
const Orders = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
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
  }, []);
  const handleDoubleClickModelChange = (row) => {
    navigate("/home/orders/edit/" + row.id);
  };

  function handlePrint(id) {
    window.open(`/print/${id}`, "_blank");
  }
  function handleEditar(id) {
    navigate("/home/orders/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }

  const handleClose = () => {
    setContextMenu(null);
  };

  //Funciones para el menu del click derecho
  function entregar() {
    console.log("entregar", selectedRow);
  }
  function avisarWhatsApp() {
    console.log("avisarWhatsApp", selectedRow);
  }
  function avisarEmail() {
    console.log("avisarEmail", selectedRow);
  }
  function imprimir() {
    window.open(`/print/${selectedRow}`, "_blank");
    handleClose();
  }
  function editar() {
    navigate("/home/orders/edit/" + selectedRow);
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
          entregar={entregar}
          avisarWhatsApp={avisarWhatsApp}
          avisarEmail={avisarEmail}
          imprimir={imprimir}
          editar={editar}
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
