import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Stack } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "nombre", headerName: "Nombre completo", width: 180 },
  { field: "dni", headerName: "DNI", width: 100 },
  { field: "email", headerName: "Email", width: 280 },
  { field: "telefono", headerName: "Telefono", width: 180 },
  { field: "totalOts", headerName: "Total de Reparaciones", width: 180 },
  { field: "fechaUltimaOt", headerName: "fecha ultima Reparacion", width: 180 },
];

export default function TablaClients({ rows }) {
  const [cliente, setCliente] = useState("");
  const [selectionModel, setSelectionModel] = useState(null);

  const handleClienteSearch = (e) => {
    setCliente(e.target.value);
  };
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }
  return (
    <Box sx={{ height: 600, width: "100%", maxWidth: "1400px" }}>
      <TextField
        sx={{ mb: 2 }}
        size="small"
        fullWidth
        label="Buscar por nombre, apellido o telefono"
        value={cliente}
        onChange={handleClienteSearch}
      />
      <DataGrid
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
