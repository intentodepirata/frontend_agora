import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "operacion",
    headerName: "Operacion",
    width: 200,
  },
  {
    field: "componente",
    headerName: "Componente",
    width: 200,
  },
  {
    field: "pdtStock",
    headerName: "Pendiente de Stock",
    width: 150,
  },
  {
    field: "tiempo",
    headerName: "Tiempo",
    width: 150,
  },

  {
    field: "precio",
    headerName: "Precio",
    width: 150,
  },
];

const defaultOperationValue = {
  operacion: "",
  componente: "",
  pdtStock: "no",
  tiempo: "",
  precio: "100",
};

const TablaReparacion = () => {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [selectionModel, setSelectionModel] = useState(null);
  const [lastId, setLastId] = useState(0);
  const [iconosVisibles, setIconosVisibles] = useState(false);

  const [operaciones, setOperaciones] = useState([]);
  const [newOperation, setNewOperation] = useState(defaultOperationValue);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);

    if (newSelection.length > 0) {
      setIconosVisibles(true);
      setFilaSeleccionada(newSelection);
    } else {
      setIconosVisibles(false);
      setFilaSeleccionada(null);
    }
  };

  function handleEditar(id) {
    console.log("editando", id);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }

  const handleNewOperation = (e) => {
    setNewOperation((currentValue) => ({
      ...currentValue,
      [e.target.name]: e.target.value,
      id: lastId + 1,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setOperaciones((currentValues) => [...currentValues, newOperation]);
    setLastId(lastId + 1);
    setNewOperation(defaultOperationValue);
  }

  return (
    <>
      <Box
        onSubmit={handleSubmit}
        component={"form"}
        sx={{ display: "flex", gap: 2, pt: 1 }}
      >
        <FormControl fullWidth>
          <InputLabel size="small">Agregar Operacion</InputLabel>
          <Select
            name="operacion"
            size="small"
            value={newOperation.operacion}
            label="Agregar Operacion"
            onChange={handleNewOperation}
          >
            <MenuItem value={"sustitucion"}>Sustitucion</MenuItem>
            <MenuItem value={"componente presupuestado"}>
              Componente presupuestado
            </MenuItem>
            <MenuItem value={"ajuste mecanico"}>Ajuste Mecanico</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel size="small">Agregar Componente</InputLabel>
          <Select
            name="componente"
            size="small"
            value={newOperation.componente}
            label="Agregar Componente"
            onChange={handleNewOperation}
          >
            <MenuItem value={"Pantalla"}>Pantalla</MenuItem>
            <MenuItem value={"Bateria"}>Bateria</MenuItem>
            <MenuItem value={"Sub PBA"}>Sub PBA</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel size="small">Tiempo operacion</InputLabel>
          <Select
            name="tiempo"
            size="small"
            value={newOperation.tiempo}
            label="Coste operacion"
            onChange={handleNewOperation}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={0.25}>0.25</MenuItem>
            <MenuItem value={0.5}>0.50</MenuItem>
            <MenuItem value={0.75}>0.75</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Agregar
        </Button>
      </Box>
      <Box sx={{ mt: 2, height: "375px", width: "100%", minWidth: "400px" }}>
        <DataGrid
          rows={operaciones}
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
        />
      </Box>

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
    </>
  );
};
export default TablaReparacion;
