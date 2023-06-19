import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { columns } from "./utils/columnas";

export default function TablaProducts({
  rows,
  fetchComponentes,
  cargando,
  agregarAlCarrito,
}) {
  const [selectionModel, setSelectionModel] = useState(null);

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/products/edit/" + id[0]);
  }

  async function handleEliminar(id) {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );

    if (confirmacion) {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "componente/" + id,
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

        alert("Elemento eliminado correctamente");
        fetchComponentes(); // Obtener los datos actualizados
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1000px" }}>
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
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
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
          onClick={() => agregarAlCarrito(selectionModel)}
          variant="contained"
          endIcon={<ShoppingCartCheckoutIcon />}
          color="warning"
        >
          Carrito
        </Button>
      </Stack>
    </Box>
  );
}
