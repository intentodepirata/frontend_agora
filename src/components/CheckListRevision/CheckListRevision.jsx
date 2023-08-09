import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import { enqueueSnackbar } from "notistack";
import { initialState } from "./utils/initialState";

export default function CheckListRevision({
  checklist,
  createChecklistMutation,
  updateChecklistMutation,
  entregada,
}) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (checklist) {
      const convertedChecklist = {};
      //Cambiar el estado de todos los checkbox a boolean
      for (const key in checklist) {
        if (key !== "id") {
          // Excluir la propiedad 'id'
          convertedChecklist[key] = Boolean(checklist[key]);
        }
      }

      setState(convertedChecklist);
    }
  }, [checklist]);

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    checklist
      ? updateChecklistMutation.mutate(state)
      : createChecklistMutation.mutate({ state });
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
              disabled={entregada}
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
              disabled={entregada}
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
              disabled={entregada}
            />
          }
          label="Pantalla"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.tapa}
              onChange={handleChange}
              name="tapa"
              disabled={entregada}
            />
          }
          label="Tapa trasera"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.camaras}
              onChange={handleChange}
              name="camaras"
              disabled={entregada}
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
              disabled={entregada}
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
              disabled={entregada}
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
              disabled={entregada}
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
              disabled={entregada}
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
        disabled={entregada}
      >
        Guardar
      </Button>
    </FormControl>
  );
}
