import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { columns } from "./utils/columnas";
import { useNavigate } from "react-router-dom";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";

export default function TablaOrders({ rows, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/orders/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }
  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
      <DataGrid
        sx={{
          "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
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
