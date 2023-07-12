import { Box, Button, Stack, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { enqueueSnackbar } from "notistack";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { columnsServicios } from "../TablaGenerica/utils/columnas";
export default function TablaServicios({ cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicioActualizado, setServicioActualizado] = useState(null);
  const [servicio, setServicio] = useState("");
  const [precio, setPrecio] = useState("");
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();

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
    <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
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
      />
    </Box>
  );
}
