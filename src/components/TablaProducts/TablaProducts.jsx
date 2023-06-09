import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "OT", width: 80 },
  { field: "nombre", headerName: "Producto", width: 200 },
  { field: "modelo", headerName: "Modelo", width: 180 },
  { field: "marca", headerName: "Marca", width: 80 },
  { field: "fechaRegistro", headerName: "Fecha de Entrada", width: 140 },
  { field: "existencias", headerName: "Existencias", width: 140 },
];

export default function TablaProducts({ rows }) {
  const [product, setProduct] = useState("");
  const [selectionModel, setSelectionModel] = useState(null);

  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/products/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }
  const handleProductSearch = (e) => {
    setProduct(e.target.value);
  };
  return (
    <Box sx={{ height: 600, width: "100%", maxWidth: "1400px" }}>
      <TextField
        sx={{ mb: 2 }}
        size="small"
        fullWidth
        label="Buscar por nombre, marca, modelo"
        value={product}
        onChange={handleProductSearch}
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
