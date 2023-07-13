import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import useScrollUp from "../hooks/useScrollUp";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsChecklist } from "../components/TablaGenerica/utils/columnas";

const Plantillas = () => {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicioActualizado, setServicioActualizado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [rows, setRows] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [cargando, setCargando] = useState(false);
  useScrollUp();
  const { user } = useUserContext();
  const handleSubmit = () => {
    fetchPlantilla();
  };

  const fetchPlantilla = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}negocios/policy/${user.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({ plantilla }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error al guardar la plantilla");
      }
      setPlantilla(data.politicas);
      enqueueSnackbar("La plantilla ha sido guardada", {
        variant: "success",
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getPlantilla();
  }, []);
  const getPlantilla = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}negocios/user/${user.id}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error al 0btener la plantilla");
      }

      setPlantilla(data.politicas);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 2,
          py: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial">
          Politicas y plantillas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: 6,
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #E0E0E0",
        }}
      >
        <Typography variant="body1" color="initial" mb={2}>
          Aquí puedes agregar las políticas de garantía que saldrán en tus
          facturas para que el cliente las lea y firme.
        </Typography>

        <TextField
          fullWidth
          id="plantilla"
          label="Introduce tu texto aqui"
          value={plantilla}
          onChange={(e) => setPlantilla(e.target.value)}
          multiline
          variant="filled"
        />
      </Paper>

      <Typography mt={5} mb={3} component="h1" variant="h6" color="initial">
        Checklist de revision
      </Typography>

      <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
          spacing={2}
        >
          <TextField
            fullWidth
            id="checlist"
            label="Agrega nuevos test"
            value={nombre}
            size="small"
            onChange={(e) => setNombre(e.target.value)}
            mr={2}
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
          columns={columnsChecklist}
          rows={rows}
          cargando={cargando}
          setSelectionModel={setSelectionModel}
        />
      </Box>
    </>
  );
};

export default Plantillas;
