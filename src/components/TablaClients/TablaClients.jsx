import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, LinearProgress, Stack } from "@mui/material";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { useNavigate } from "react-router-dom";
import { columns } from "./utils/columnas";

export default function TablaClients({ rows, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/clientes/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }
  return (
    <Box sx={{ height: 740, width: "auto", maxWidth: "1400px" }}>
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
      </Stack>
    </Box>
  );
}
