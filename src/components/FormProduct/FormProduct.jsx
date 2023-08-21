import { useState } from "react";
import { FormProductSchema } from "./FormProductSchema";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import { initialValues } from "./utils/initialValues";
import { getBrands } from "../../api/brands";
import { useQuery } from "@tanstack/react-query";
import { findBrandModels } from "../../api/models";

const FormProduct = ({ producto, createMutation, updateMutation }) => {
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
    enableReinitialize: true,
    initialValues: producto ? producto : initialValues,
    validationSchema: FormProductSchema,
    onSubmit: async function (values, actions) {
      producto ? updateMutation.mutate(values) : createMutation.mutate(values);
      actions.resetForm();
    },
  });

  useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(user.token),
    onSuccess: (data) => setMarcas(data.data),
    onError: (error) => {
      console.error(error.message);
    },
  });

  useQuery({
    queryKey: ["models", values.marca],
    queryFn: () => {
      if (values.marca) {
        return findBrandModels(values.marca, user.token);
      }
    },
    onSuccess: (data) => setModelos(data.data),
    onError: (error) => {
      console.error(error.message);
    },
    // Habilitar la llamada solo si values.marca tiene un valor
    enabled: Boolean(values.marca),
  });

  const getSelectedValue = (array, value, property) => {
    return array.find((item) => item.id === value)?.[property] || "";
  };

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
        width: "100%",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{ mb: 1 }}
          fontWeight={"bold"}
          variant="h5"
          color={"primary"}
        >
          {producto ? "Editar Producto" : "Nuevo Producto"}
        </Typography>
        <Typography
          sx={{ mb: 2 }}
          fontWeight={"bold"}
          variant="body1"
          color={"grey"}
        >
          Rellene todos los campos para agregar un producto
        </Typography>

        <TextField
          fullWidth
          size="small"
          name="nombre"
          label="Nombre"
          InputLabelProps={{
            shrink: producto?.nombre && true,
          }}
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.nombre && Boolean(errors.nombre)}
          helperText={touched.nombre && errors.nombre}
          sx={{ mr: 2 }}
        />

        <FormControl
          size="small"
          error={touched.marca && Boolean(errors.marca)}
          sx={{
            width: "100%",
            mt: 2,
          }}
        >
          <InputLabel>Marca del dispositivo</InputLabel>
          <Select
            id="marca"
            name="marca"
            label="Marca del dispositivo"
            value={getSelectedValue(marcas, values.marca, "id")}
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
          error={touched.modelos_id && Boolean(errors.modelos_id)}
          sx={{
            mt: 2,
            display: values.marca ? "inline-flex" : "none",
            width: "100%",
          }}
        >
          <InputLabel>Modelo del dispositivo</InputLabel>
          <Select
            id="modelos_id"
            label="Modelo del dispositivo"
            name="modelos_id"
            value={getSelectedValue(modelos, values.modelos_id, "id")}
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
          id="cantidad"
          size="small"
          name="cantidad"
          label="Cantidad"
          type="number"
          InputLabelProps={{
            shrink: producto?.precio && true,
          }}
          value={values.cantidad}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.cantidad && Boolean(errors.cantidad)}
          helperText={touched.cantidad && errors.cantidad}
          sx={{ width: "50%", mr: 2 }}
        />

        <TextField
          id="precio"
          size="small"
          name="precio"
          label="Precio Unidad"
          type="number"
          InputLabelProps={{
            shrink: producto?.precio && true,
          }}
          value={values.precio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.precio && Boolean(errors.precio)}
          helperText={touched.precio && errors.precio}
          sx={{ width: "50%" }}
        />
      </Box>
      <Box>
        <Button
          disabled={isSubmitting}
          sx={{ textTransform: "none" }}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {isSubmitting
            ? "Guardando"
            : producto
            ? "Actualizar"
            : "Guardar Producto"}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormProduct;
