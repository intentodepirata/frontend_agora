import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import SaveIcon from "@mui/icons-material/Save";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { initialState } from "./utils/initialState";
import { enqueueSnackbar } from "notistack";

export default function CheckListRevision({
  order,
  createChecklistMutation,
  updateChecklistMutation,
  entregada,
  setStateChecklist,
  stateChecklist,
  handleSubmit,
}) {
  useEffect(() => {
    if (order?.checklist) {
      const { checklist } = order;
      const convertedChecklist = {};
      //Cambiar el estado de todos los checkbox a boolean
      for (const key in checklist) {
        if (key !== "id") {
          // Excluir la propiedad 'id'
          convertedChecklist[key] = Boolean(checklist[key]);
        }
      }

      setStateChecklist(convertedChecklist);
    }
  }, [order?.checklist]);

  const handleChange = (event) => {
    setStateChecklist((prevState) => ({
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
              checked={stateChecklist.encendido}
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
              checked={stateChecklist.cobertura}
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
              checked={stateChecklist.pantalla}
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
              checked={stateChecklist.tapa}
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
              checked={stateChecklist.camaras}
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
              checked={stateChecklist.sonido}
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
              checked={stateChecklist.carga}
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
              checked={stateChecklist.microfono}
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
              checked={stateChecklist.huella}
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
        variant="contained"
        disabled={entregada}
        color="primary"
        endIcon={
          createChecklistMutation?.isLoading ||
          updateChecklistMutation?.isLoading ? (
            <CircularProgress size={"10px"} color="grey" />
          ) : (
            <SaveIcon size="10px" />
          )
        }
      >
        {createChecklistMutation?.isLoading ||
        updateChecklistMutation?.isLoading
          ? "Guardando..."
          : "Guardar"}
      </Button>
    </FormControl>
  );
}
