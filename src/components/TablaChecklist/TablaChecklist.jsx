import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function TablaChecklist({ cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicioActualizado, setServicioActualizado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [rows, setRows] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
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
      <DataGrid
        sx={{
          "& .css-mf4goe-MuiDataGrid-root": {
            fontWeight: 700,
            color: "grey",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          height: 420,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowSelectionModelChange={handleSelectionModelChange}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={Boolean(cargando)}
        localeText={customLocaleText}
      />
    </Box>
  );
}
