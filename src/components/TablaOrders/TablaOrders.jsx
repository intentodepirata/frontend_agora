import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const columns = [
  { field: "id", headerName: "OT", width: 80 },
  { field: "marca", headerName: "Marca", width: 80 },
  { field: "modelo", headerName: "Modelo", width: 180 },
  { field: "cliente", headerName: "Cliente", width: 200 },
  { field: "telefono", headerName: "Telefono", width: 100 },
  { field: "dni", headerName: "DNI", width: 100 },
  { field: "estado", headerName: "Estado", width: 170 },
  { field: "tipoGarantia", headerName: "Tipo de Garantia", width: 140 },

  {
    field: "fechaEntrada",
    headerName: "Fecha de entrada",
    width: 135,
  },
  {
    field: "fechaModificacion",
    headerName: "Fecha modificacion",
    width: 135,
  },
];

export default function TablaOrders({ rows }) {
  const [order, setOrder] = useState("");
  const [selectionModel, setSelectionModel] = useState(null);

  const handleOrderSearch = (e) => {
    setOrder(e.target.value);
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
        label="Buscar por OT, IMEI, nombre, modelo o telefono"
        value={order}
        onChange={handleOrderSearch}
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
