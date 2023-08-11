import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { FormDispositivoSchema } from "./FormDispositivoSchema";
import { initialValues } from "./utils/initialValues";
import { useUserContext } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { findBrandModels, getBrands } from "../../api/brands";

const FormDispositivo = ({ createDeviceMutation }) => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const { user } = useUserContext();

  const {
    isSubmitting,
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: FormDispositivoSchema,
    onSubmit: async function (values, actions) {
      createDeviceMutation.mutate(values);
    },
  });

  useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(user.token),
    onSuccess: (data) => setMarcas(data.data),
    onError: (error) => console.error(error.message),
  });

  useQuery({
    queryKey: ["models", values.marca],
    queryFn: () => {
      if (values.marca) {
        return findBrandModels(values.marca, user.token);
      }
    },
    onSuccess: (data) => setModelos(data.data),
    onError: (error) => console.error(error.message),
    enabled: Boolean(values.marca),
  });

  return (
    <Paper
      elevation={4}
      onSubmit={handleSubmit}
      component="form"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        maxWidth: "1308px",
        margin: "auto",
      }}
    >
      <Typography
        sx={{ textAlign: "left", mb: 1 }}
        fontWeight={"bold"}
        variant="h6"
        color={createDeviceMutation?.isSuccess ? "primary" : "grey"}
      >
        Datos Dispositivo
      </Typography>
      <Typography variant="body1" color="grey" mb={2}>
        Rellene todos los campos para agregar un dispositivo
      </Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          id="imei"
          size="small"
          name="imei"
          label="IMEI"
          disabled={createDeviceMutation?.isSuccess}
          value={values.imei}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.imei && Boolean(errors.imei)}
          helperText={touched.imei && errors.imei}
          sx={{ mr: 2, width: "33%" }}
        />

        <FormControl
          size="small"
          disabled={createDeviceMutation?.isSuccess}
          error={touched.marca && Boolean(errors.marca)}
          sx={{ mr: 2, width: "33%" }}
        >
          <InputLabel>Marca del dispositivo</InputLabel>
          <Select
            id="marca"
            name="marca"
            label="Marca del dispositivo"
            value={values.marca}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="">Seleccionar marca</MenuItem>
            {marcas?.map((marca) => (
              <MenuItem key={marca.id} value={marca.id}>
                {marca.nombre}
              </MenuItem>
            ))}
          </Select>
          {touched.marca && errors.marca && (
            <FormHelperText>{errors.marca}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          size="small"
          disabled={createDeviceMutation?.isSuccess}
          error={touched.modelos_id && Boolean(errors.modelos_id)}
          sx={{ width: "33%" }}
        >
          <InputLabel>Modelo del dispositivo</InputLabel>
          <Select
            label="Modelo del dispositivo"
            id="modelos_id"
            name="modelos_id"
            value={values.modelos_id}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="">Seleccionar modelo</MenuItem>
            {modelos?.map((modelo) => (
              <MenuItem key={modelo.id} value={modelo.id}>
                {modelo.nombre}
              </MenuItem>
            ))}
          </Select>
          {touched.modelos_id && errors.modelos_id && (
            <FormHelperText>{errors.modelos_id}</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          id="cosmetica"
          size="small"
          name="cosmetica"
          label="Estado cosmetico del dispositivo"
          disabled={createDeviceMutation?.isSuccess}
          value={values.cosmetica}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.cosmetica && Boolean(errors.cosmetica)}
          helperText={touched.cosmetica && errors.cosmetica}
          sx={{ width: "75%", mr: 2 }}
        />
        <TextField
          id="color"
          size="small"
          name="color"
          label="Color del dispositivo"
          disabled={createDeviceMutation?.isSuccess}
          value={values.color}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.color && Boolean(errors.color)}
          helperText={touched.color && errors.color}
          sx={{ width: "25%" }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          size="small"
          name="averia"
          label="Sintoma detectado por el cliente"
          disabled={createDeviceMutation?.isSuccess}
          value={values.averia}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.averia && Boolean(errors.averia)}
          helperText={touched.averia && errors.averia}
          sx={{ width: "50%", mr: 2 }}
        />

        <TextField
          sx={{ width: "25%", mr: 2 }}
          id="fechaCompra"
          size="small"
          label="Fecha de compra"
          name="fechaCompra"
          type="date"
          InputLabelProps={{ shrink: true }}
          disabled={createDeviceMutation?.isSuccess}
          value={values.fechaCompra}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fechaCompra && Boolean(errors.fechaCompra)}
          helperText={touched.fechaCompra && errors.fechaCompra}
        />

        <Button
          disabled={isSubmitting || createDeviceMutation?.isSuccess}
          sx={{ width: "25%", textTransform: "none", height: "40px" }}
          variant="contained"
          color="primary"
          type="submit"
          size="small"
        >
          {createDeviceMutation?.isSuccess
            ? "Dispositivo Guardado"
            : "Guardar dispositivo"}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormDispositivo;
