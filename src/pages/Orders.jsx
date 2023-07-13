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
const Orders = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [selectionModel, setSelectionModel] = useState(null);
  const { user } = useUserContext();
  useScrollUp();
  const navigate = useNavigate();
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
  function handlePrint(id) {
    window.open(`/print/${id}`, "_blank");
  }
  function handleEditar(id) {
    navigate("/home/orders/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
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
        />
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
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
