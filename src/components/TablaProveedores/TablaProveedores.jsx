import { Box, Button, LinearProgress, Stack } from "@mui/material";
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
import { closeSnackbar, enqueueSnackbar } from "notistack";

export default function TablaProveedores({ rows, fetchProveedores, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

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
