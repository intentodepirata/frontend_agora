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

const FormOperacionesTecnicas = ({ cliente_id, dispositivo_id }) => {
  const [averia, setAveria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [estado_id, setEstado_id] = useState("");
  const [checklist_id, setChecklist_id] = useState(undefined);
  const [estados, setEstados] = useState([]);
  const [tipoGarantia, setTipoGarantia] = useState("");
  const [ot, setOt] = useState(initialValues);
  const [numeroOt, setNumeroOt] = useState(null);
  const { user } = useUserContext();

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
      observaciones &&
      checklist_id &&
      dispositivo_id
    ) {
      console.log("hay ot");
      const crearOt = async () => {
        try {
          const token = user.token;

          const ot = {
            averia,
            descripcion,
            observaciones,
            tipoGarantia,
            estado_id,
            cliente_id,
            checklist_id,
            dispositivo_id,
          };
          console.log(ot);

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
            alert("Datos Guardados Correctamente");
            setOt(data);
            setNumeroOt(data);
          }
        } catch (error) {}
      };
      crearOt();
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
  const handleEstado = (event) => {
    setEstado_id(event.target.value);
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
    <Paper
      elevation={4}
      sx={{ p: 2, display: "flex", alignItems: "center", maxWidth: "1308px" }}
    >
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
              OT000{numeroOt}
            </Typography>
            <Typography ml={2} variant="h6" color="primary">
              {estados &&
                estados.find((estado) => estado.id === estado_id)?.nombre}
            </Typography>
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
            <FormControl htmlFor="averia" sx={{ mb: 2, width: "100%" }}>
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
        <TablaReparacion />
      </Box>
      <Box sx={{ ml: 4 }}>
        <Paper elevation={4} sx={{ p: 2, mb: 4 }}>
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
              0 €
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
            setChecklist_id={setChecklist_id}
            dispositivo_id={dispositivo_id}
          />
        </Paper>
      </Box>
    </Paper>
  );
};

export default FormOperacionesTecnicas;
