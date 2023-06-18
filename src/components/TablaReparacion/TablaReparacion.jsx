import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { columns } from "./utils/columnsValues";
import { useUserContext } from "../../contexts/UserContext";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay/CustomNoRowsOverlay";

const TablaReparacion = ({
  ots_id,
  dispositivo_id,
  updatedDispositivo_id,
  setPrecio,
}) => {
  const [selectionModel, setSelectionModel] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const [rows, setRows] = useState([]);
  const [operacion, setOperacion] = useState("");
  const [componentes_id, setComponentes_id] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [actualizarTabla, setActualizarTabla] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { user } = useUserContext();
  const fetchcomponentes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}componente/modelo/${
          dispositivo_id ? dispositivo_id : updatedDispositivo_id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setComponentes(data);
      } else {
        console.error("Error al obtener los componentes:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };
  const fetchOperacionesByOt = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}operacion/${ots_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setRows(data);
        setCargando(false);
        setActualizarTabla(false);
      } else {
        console.error("Error al obtener las operaciones:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener las operaciones:", error);
    }
  };

  const fetchPrecio = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/price/${ots_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      setPrecio(data);
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  const fetchOperaciones = async () => {
    try {
      const values = {
        operacion,
        componentes_id,
        tiempo,
        ots_id,
      };

      const url = `${import.meta.env.VITE_API_URL}operacion/`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setOperacion("");
        setComponentes_id("");
        setTiempo("");
        alert("Datos Guardados Correctamente", data);
        setActualizarTabla(true);
      } else {
        console.error("Error al guardar operacion:", response.status);
      }
    } catch (error) {
      console.error("Error del servidor:", error);
    }
  };

  useEffect(() => {
    fetchOperacionesByOt();
    fetchcomponentes();
  }, [updatedDispositivo_id, dispositivo_id]);

  useEffect(() => {
    if (actualizarTabla) {
      fetchOperacionesByOt();
      fetchPrecio();
    }
  }, [actualizarTabla]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
  }
  function handleEliminar(id) {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );

    if (confirmacion) {
      fetch(`${import.meta.env.VITE_API_URL}operacion/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el elemento");
          }

          alert("Eliminado correctamente");
          setActualizarTabla(true); // Obtener los datos actualizados
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchOperaciones();
    fetchPrecio();
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
            value={operacion}
            label="Agregar Operacion"
            onChange={(e) => setOperacion(e.target.value)}
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
            value={componentes_id}
            label="Agregar Componente"
            onChange={(e) => setComponentes_id(e.target.value)}
          >
            <MenuItem value={""}>
              {componentes.length === 0
                ? "No hay componentes en el inventario"
                : "Seleccione un componente"}
            </MenuItem>
            {componentes.map((componente) => (
              <MenuItem key={componente.id} value={componente.id}>
                {componente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel size="small">Tiempo operacion</InputLabel>
          <Select
            name="tiempo"
            size="small"
            value={tiempo}
            label="Coste operacion"
            onChange={(e) => setTiempo(e.target.value)}
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
          sx={{
            "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
              color: "grey",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          onRowSelectionModelChange={handleSelectionModelChange}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            loadingOverlay: LinearProgress,
          }}
          loading={Boolean(cargando)}
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
