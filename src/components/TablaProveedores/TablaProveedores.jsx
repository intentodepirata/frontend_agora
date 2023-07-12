import { Box, Button, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { columnsProveedores } from "../TablaGenerica/utils/columnas";

export default function TablaProveedores({ rows, fetchProveedores, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  function handleEditar(id) {
    navigate("/home/suppliers/edit/" + id[0]);
  }
  const handleDeleteProveedores = (id) => {
    enqueueSnackbar("Desear eliminar al proveedor?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => handleEliminar(id, snackbarId)}
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

  async function handleEliminar([id]) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}proveedores/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el elemento");
      }

      enqueueSnackbar("Proveedor eliminado correctamente", {
        variant: "success",
      });
      fetchProveedores();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
      <TablaGenerica
        columns={columnsProveedores}
        rows={rows}
        cargando={cargando}
        setSelectionModel={setSelectionModel}
      />
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
        <Button
          onClick={() => handleDeleteProveedores(selectionModel)}
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
  );
}
