import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function TablaServicios({ rows, fetchProveedores, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicio, setServicio] = useState("");
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/services/edit/" + id[0]);
  }

  async function handleEliminar(id) {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );

    if (confirmacion) {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "servicios/" + id,
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

        alert("Servicio eliminado correctamente");
        fetchProveedores(); // Obtener los datos actualizados
      } catch (error) {
        alert(error.message);
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
          onClick={() => handleEditar(selectionModel)}
          variant="contained"
          startIcon={<AddBoxIcon />}
          color="success"
          sx={{ minWidth: 120 }}
        >
          Agregar
        </Button>
      </Stack>
      <DataGrid
        sx={{
          "& .css-mf4goe-MuiDataGrid-root": {
            fontWeight: 700,
            color: "grey",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          height: 720,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        onRowSelectionModelChange={handleSelectionModelChange}
        slots={{
          toolbar: CustomGridToolbar,
          loadingOverlay: LinearProgress,
          footer: CustomGridFooter,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        loading={Boolean(cargando)}
        localeText={customLocaleText}
      />
    </Box>
  );
}
