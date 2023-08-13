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
import {
  addService,
  deleteService,
  getServices,
  updateService,
} from "../api/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";
export default function Services() {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicioId, setServicioId] = useState(null);
  const [servicio, setServicio] = useState({ servicio: "", precio: "" });
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  useScrollUp();

  const handleServicioChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const query = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(user.token),
    onSuccess: (data) => setRows(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });
  const createMutation = useMutation({
    mutationFn: (values) => addService(values, user.token),
    onSuccess: () => {
      setServicio({ servicio: "", precio: "" });
      enqueueSnackbar("Servicio creado correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["services"]);
    },
  });
  const updateMutation = useMutation({
    mutationFn: (values) => updateService(servicioId, values, user.token),
    onSuccess: () => {
      setServicio({ servicio: "", precio: "" });
      setServicioId(null);
      enqueueSnackbar("Servicio actualizado correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["services"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteService(id, user.token),
    onSuccess: () => {
      setServicio({ servicio: "", precio: "" });
      setServicioId(null);
      enqueueSnackbar("Servicio eliminado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["services"]);
    },
  });
  const handleDelete = (id) => {
    enqueueSnackbar("Desear eliminar el servicio?", {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (servicio.servicio === "" || servicio.precio === "") {
      enqueueSnackbar("Todos los campos son obligatorios", {
        variant: "error",
      });
      return;
    }

    servicioId
      ? updateMutation.mutate(servicio)
      : createMutation.mutate(servicio);
  };

  const handleDoubleClickModelChange = (row) => {
    setServicio({ servicio: row.row.servicio, precio: row.row.precio });
    setServicioId(row.id);
  };

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
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            id="servicio"
            name="servicio"
            label="Agrega nuevos servicios"
            value={servicio.servicio}
            size="small"
            onChange={handleServicioChange}
            mr={2}
          />
          <TextField
            id="coste"
            label="Precio"
            name="precio"
            value={servicio.precio}
            size="small"
            onChange={handleServicioChange}
          />
          <Button
            onClick={() => handleDelete(selectionModel)}
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
            type="submit"
            variant="contained"
            startIcon={<AddBoxIcon />}
            color="success"
            sx={{ minWidth: 140 }}
          >
            {servicioId ? "Actualizar" : "Agregar"}
          </Button>
        </Stack>
        <TablaGenerica
          columns={columnsServicios}
          rows={rows}
          cargando={query.isFetching}
          setSelectionModel={setSelectionModel}
          handleDoubleClickModelChange={handleDoubleClickModelChange}
        />
      </Box>
    </>
  );
}
