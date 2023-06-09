import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { Button } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";

export default function CheckListRevision({ setChecklist_id, dispositivo_id }) {
  const [state, setState] = useState({
    encendido: false,
    cobertura: false,
    pantalla: false,
    tapa: false,
    camaras: false,
    sonido: false,
    carga: false,
    microfono: false,
    huella: false,
  });
  const { user } = useUserContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const postChecklist = async () => {
      try {
        const token = user.token;
        const checklistWithDispositivoId = {
          ...state,
          dispositivo_id,
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
      } catch (error) {}
    };
    postChecklist();
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
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
          label="Camaras"
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
          label="Microfono"
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
