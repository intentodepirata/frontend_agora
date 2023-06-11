import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";

export default function CheckListRevision({
  checklist,
  setChecklist_id,
  dispositivo_id,
  updatedDispositivo_id,
}) {
  const initialState = {
    encendido: false,
    cobertura: false,
    pantalla: false,
    tapa: false,
    camaras: false,
    sonido: false,
    carga: false,
    microfono: false,
    huella: false,
  };

  const [state, setState] = useState(initialState);

  const { user } = useUserContext();

  useEffect(() => {
    if (checklist) {
      const convertedChecklist = {};
      //Cambiar el estado de todos los checkbox a boolean
      for (const key in checklist) {
        convertedChecklist[key] = Boolean(checklist[key]);
      }

      setState(convertedChecklist);
    }
  }, [checklist]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = user.token;
      const checklistWithDispositivoId = {
        ...state,
        dispositivo_id: updatedDispositivo_id || dispositivo_id,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}checklist/`,
        {
          method: "POST",
          body: JSON.stringify(checklistWithDispositivoId),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      alert("checklist guardado");
      setChecklist_id(data);
    } catch (error) {
      // Manejo del error
    }
  };

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <FormControl
      sx={{ m: 2, border: 1, p: 3 }}
      component="fieldset"
      variant="standard"
    >
      <FormLabel sx={{ textAlign: "center", mb: 1 }} component="legend">
        Revision Estado Dispositivo
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.encendido}
              onChange={handleChange}
              name="encendido"
            />
          }
          label="Encendido"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.cobertura}
              onChange={handleChange}
              name="cobertura"
            />
          }
          label="Cobertura"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.pantalla}
              onChange={handleChange}
              name="pantalla"
            />
          }
          label="Pantalla"
        />
        <FormControlLabel
          control={
            <Switch checked={state.tapa} onChange={handleChange} name="tapa" />
          }
          label="Tapa trasera"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.camaras}
              onChange={handleChange}
              name="camaras"
            />
          }
          label="Cámaras"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.sonido}
              onChange={handleChange}
              name="sonido"
            />
          }
          label="Sonido"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.carga}
              onChange={handleChange}
              name="carga"
            />
          }
          label="Carga"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.microfono}
              onChange={handleChange}
              name="microfono"
            />
          }
          label="Micrófono"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.huella}
              onChange={handleChange}
              name="huella"
            />
          }
          label="Huella o Face ID"
        />
      </FormGroup>
      <FormHelperText sx={{ my: 1 }}>
        Revisar cuidadosamente antes de reparar
      </FormHelperText>
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", fontSize: "16px" }}
      >
        Guardar
      </Button>
    </FormControl>
  );
}
