import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, LinearProgress, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "./utils/columns";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { customLocaleText } from "../../traductions/customGridLocaleText";

export default function TablaHome({ rows, cargando, opcionesFiltro }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handlePrint(id) {
    window.open(`/print/${id}`, "_blank");
  }
  function handleEditar(id) {
    navigate("/home/orders/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }
  return (
    <Box sx={{ width: "100%", maxWidth: "1400px" }}>
      <DataGrid
        sx={{
          "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            color: "grey",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          height: 660,
          mb: 2,
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
          footer: CustomGridFooter,
          loadingOverlay: LinearProgress,
        }}
        loading={Boolean(cargando)}
        localeText={customLocaleText}
        filterModel={opcionesFiltro ? opcionesFiltro : undefined}
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
          onClick={() => handlePrint(selectionModel)}
          variant="contained"
          endIcon={<PrintIcon />}
          color="success"
        >
          Imprimir
        </Button>
      </Stack>
    </Box>
  );
}
