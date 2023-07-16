import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import useScrollUp from "../hooks/useScrollUp";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { columnsServicios } from "../components/TablaGenerica/utils/columnas";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
export default function Services() {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicioActualizado, setServicioActualizado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [servicio, setServicio] = useState("");
  const [precio, setPrecio] = useState("");
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();

  useScrollUp();

  useEffect(() => {
    fetchServicios();
  }, []);

  async function handleSubmit() {
    if (servicio === "" || precio === "") {
      enqueueSnackbar("Todos los campos son obligatorios", {
        variant: "error",
      });
      return;
    }
    const url = servicioActualizado
      ? `${import.meta.env.VITE_API_URL}servicios/${servicioActualizado}`
      : `${import.meta.env.VITE_API_URL}servicios`;
    const response = await fetch(url, {
      method: servicioActualizado ? "PUT" : "POST",
      body: JSON.stringify({ servicio, precio }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      enqueueSnackbar(data.error, { variant: "error" });
      throw new Error(data.error);
    }

    enqueueSnackbar(
      `Servicio ${
        servicioActualizado ? "actualizado" : "creado"
      } correctamente`,
      { variant: "success" }
    );
    setPrecio("");
    setServicio("");
    fetchServicios();
    setServicioActualizado(null);
  }
  async function fetchServicios() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}servicios`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      enqueueSnackbar(data.error, { variant: "error" });
      throw new Error(data.error);
    }
    setRows(data);
  }
  const handleDoubleClickModelChange = (row) => {
    setPrecio(row.row.precio);
    setServicio(row.row.servicio);
    setServicioActualizado(row.id);
  };
  async function handleEditar([id]) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}servicios/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const [data] = await response.json();
    if (!response.ok) {
      enqueueSnackbar(data.error, { variant: "error" });
      throw new Error(data.error);
    }

    setPrecio(data.precio);
    setServicio(data.servicio);
    setServicioActualizado(data.id);
  }

  async function handleEliminar(id) {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );

    if (confirmacion) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}servicios/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el elemento");
        }

        enqueueSnackbar("Servicio eliminado correctamente", {
          variant: "success",
        });
        fetchProveedores();
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }
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
          Servicios
        </Typography>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Listado de servicios
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
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >
          <TextField
            fullWidth
            id="servicio"
            label="Agrega nuevos servicios"
            value={servicio}
            size="small"
            onChange={(e) => setServicio(e.target.value)}
            mr={2}
          />
          <TextField
            id="coste"
            label="Precio"
            value={precio}
            size="small"
            onChange={(e) => setPrecio(e.target.value)}
          />
          <Button
            onClick={() => handleEliminar(selectionModel)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ minWidth: 120 }}
          >
            Eliminar
          </Button>
          <Button
            onClick={() => handleEditar(selectionModel)}
            variant="contained"
            startIcon={<EditNoteIcon />}
            sx={{ minWidth: 120 }}
          >
            Editar
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            startIcon={<AddBoxIcon />}
            color="success"
            sx={{ minWidth: 140 }}
          >
            {servicioActualizado ? "Actualizar" : "Agregar"}
          </Button>
        </Stack>
        <TablaGenerica
          columns={columnsServicios}
          rows={rows}
          cargando={cargando}
          setSelectionModel={setSelectionModel}
          handleDoubleClickModelChange={handleDoubleClickModelChange}
        />
      </Box>
    </>
  );
}
