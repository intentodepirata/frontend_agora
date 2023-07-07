import {
  Box,
  Paper,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckListRevision from "../CheckListRevision/CheckListRevision";
import TablaReparacion from "../TablaReparacion/TablaReparacion";
import { nombreAverias } from "./utils/nombreAverias";
import { initialValues } from "./utils/initialValues";
import { useUserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const FormOperacionesTecnicas = ({
  cliente_id,
  dispositivo_id,
  fetchData,
  setFetchData,
  setEstado,
  entregada,
}) => {
  const { id } = useParams();
  const [averia, setAveria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [estado_id, setEstado_id] = useState("");
  const [checklist_id, setChecklist_id] = useState(undefined);
  const [checklist, setChecklist] = useState(null);
  const [estados, setEstados] = useState([]);
  const [tipoGarantia, setTipoGarantia] = useState("");
  const [precio, setPrecio] = useState(0);
  const [numeroOt, setNumeroOt] = useState(null);
  const [updatedDispositivo_id, setUpdatedDispositivo_id] = useState(null);
  const [updateCliente_id, setUpdateCliente_id] = useState(null);
  const [ots_id, setOts_id] = useState(id || null);
  const { user } = useUserContext();

  const fetchOt = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}ot/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const otData = await response.json();
        setUpdateCliente_id(otData.cliente_id);
        setAveria(otData.averia);
        setDescripcion(otData.descripcion);
        setObservaciones(otData.observaciones);
        setEstado_id(otData.estado_id);
        setChecklist_id(otData.checklist_id);
        setTipoGarantia(otData.tipoGarantia);
        setPrecio(otData.precio);
        setUpdatedDispositivo_id(otData.dispositivo_id);
      } else {
        console.error("Error al obtener los datos de la OT:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener los datos de la OT:", error);
    }
  };
  const fetchChecklist = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}checklist/${checklist_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Error al obtener el checklist:");
        return;
      }

      setChecklist(data);
    } catch (error) {
      console.error("Error al obtener los estados:");
    }
  };
  const crearOt = async () => {
    try {
      const token = user.token;

      const ot = {
        averia,
        descripcion,
        observaciones,
        tipoGarantia,
        estado_id,
        cliente_id: updateCliente_id ? updateCliente_id : cliente_id,
        checklist_id,
        dispositivo_id: updatedDispositivo_id
          ? updatedDispositivo_id
          : dispositivo_id,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}ot/`, {
        method: "POST",
        body: JSON.stringify(ot),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      if (response.status === 201) {
        enqueueSnackbar("Datos Guardados Correctamente", {
          variant: "success",
        });
        setOts_id(data);
        setNumeroOt(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      fetchOt();
    }
  }, [id]);

  useEffect(() => {
    if (checklist_id !== undefined) {
      fetchChecklist();
    }
  }, [checklist_id]);

  // console.log(estadoId);
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}estado/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    if (
      averia &&
      cliente_id &&
      estado_id &&
      descripcion &&
      checklist_id &&
      dispositivo_id
    ) {
      console.log("hay ot");

      if (!id) {
        crearOt();
      }
    }
  }, [
    cliente_id,
    dispositivo_id,
    checklist_id,
    tipoGarantia,
    averia,
    estado_id,
    observaciones,
    descripcion,
  ]);

  useEffect(() => {
    if (fetchData) {
      crearOt();
      enqueueSnackbar("Datos Actualizados Correctamente", {
        variant: "success",
      });
      setFetchData(false);
    }
  }, [fetchData]);
  const handleEstado = (event) => {
    setEstado_id(event.target.value);
    if (setEstado) {
      setEstado(event.target.value + 1);
    }
  };
  const handleTipoGarantia = (event) => {
    setTipoGarantia(event.target.value);
  };

  const handleObservaciones = (event) => {
    setObservaciones(event.target.value);
  };
  const handleDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handleAveria = (event) => {
    setAveria(event.target.value);
  };

  return (
    <Paper elevation={4} sx={{ p: 2, display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            my: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "end" }}>
            <Typography variant="h4" color="primary" fontWeight={"bold"}>
              OT000{id || numeroOt}
            </Typography>
            {entregada ? (
              <Typography ml={2} variant="h6" color="primary">
                Entregada
              </Typography>
            ) : (
              <Typography ml={2} variant="h6" color="primary">
                {estados &&
                  estados.find((estado) => estado.id === estado_id)?.nombre}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormControl
              htmlFor="averia"
              sx={{ mb: 2, mt: 0.5, width: "100%" }}
            >
              <InputLabel size="small" id="averia">
                Averia principal
              </InputLabel>
              <Select
                label="Averia principal"
                labelId="averia"
                name="averia"
                value={averia}
                onChange={handleAveria}
                size="small"
                disabled={entregada}
              >
                <MenuItem value="">Seleccionar Averia</MenuItem>
                {nombreAverias.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Descripcion"
              value={descripcion}
              onChange={handleDescripcion}
              disabled={entregada}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Observaciones Tecnicas"
              multiline
              rows={2}
              variant="filled"
              value={observaciones}
              onChange={handleObservaciones}
              disabled={entregada}
            />
          </Box>
        </Box>

        <Typography
          textAlign="center"
          variant="h6"
          color="grey"
          fontWeight={"bold"}
          m={2}
        >
          Operaciones Servicio Tecnico
        </Typography>
        <TablaReparacion
          ots_id={ots_id}
          dispositivo_id={dispositivo_id}
          updatedDispositivo_id={updatedDispositivo_id}
          setPrecio={setPrecio}
          entregada={entregada}
        />
      </Box>
      <Box sx={{ ml: 4 }}>
        <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="initial">
              Total a Facturar
            </Typography>
            <Typography variant="h6" color="initial">
              {precio} €
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={4} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              m: 2,
            }}
          >
            <FormControl sx={{ m: 1, width: 220 }}>
              <InputLabel id="estado">Estado</InputLabel>
              <Select
                labelId="estado"
                value={estado_id}
                onChange={handleEstado}
                autoWidth
                label="Estado"
                name="estado"
                disabled={entregada}
              >
                {estados?.map((estado) => (
                  <MenuItem key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 220 }}>
              <InputLabel id="tipoGarantia">Garantia</InputLabel>
              <Select
                labelId="tipoGarantia"
                value={tipoGarantia}
                onChange={handleTipoGarantia}
                autoWidth
                label="Garantia"
                name="tipoGarantia"
                disabled={entregada}
              >
                <MenuItem value={""}>
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value="En Garantia">En Garantia</MenuItem>
                <MenuItem value="Fuera de Garantia">Fuera de Garantia</MenuItem>
                <MenuItem value="Seguro">Seguro</MenuItem>
                <MenuItem value="Garantia SAT">Garantia SAT</MenuItem>
                <MenuItem value="Cortesia">Cortesia</MenuItem>
                <MenuItem value="Irreparable">Irreparable</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CheckListRevision
            checklist={checklist}
            setChecklist_id={setChecklist_id}
            dispositivo_id={dispositivo_id}
            updatedDispositivo_id={updatedDispositivo_id}
            entregada={entregada}
          />
        </Paper>
      </Box>
    </Paper>
  );
};

export default FormOperacionesTecnicas;
