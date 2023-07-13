import { Box, Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useScrollUp from "../hooks/useScrollUp";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsClientes } from "../components/TablaGenerica/utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
const Clientes = () => {
  const [selectionModel, setSelectionModel] = useState(null);
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { user } = useUserContext();
  useScrollUp();
  const navigate = useNavigate();

  function handleEditar(id) {
    navigate("/home/clientes/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setCargando(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}cliente/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();
        if (data.length === 0) {
          enqueueSnackbar("No hay clientes registrados", {
            variant: "info",
          });
        }
        setCargando(false);
        setRows(data);
      } catch (error) {
        console.error("Error al obtener las ots:", error);
      }
    };
    fetchClientes();
  }, []);
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
          Clientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/clientes/create"
        >
          Crear cliente
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Listado de clientes
      </Typography>
      <Box
        sx={{
          p: 2,
          height: 740,
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        <TablaGenerica
          columns={columnsClientes}
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
        </Stack>
      </Box>
    </>
  );
};

export default Clientes;
