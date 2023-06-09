import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
// import { initialValues } from "./utils/initialValues";

const FormProduct = ({ producto }) => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const initialValues = {
    nombre: producto ? producto.nombre : "",
    cantidad: producto ? producto.cantidad : "",
    precio: producto ? producto.precio : "",
    marca: producto ? producto.marcas_id : "",
    modelos_id: producto ? producto.modelos_id : "",
  };

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
    initialValues,
    validationSchema: FormProductSchema,
    onSubmit: async function (values, actions) {
      const token = user.token;
      if (producto) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}componente/${producto.id}`,
            {
              method: "PUT",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          const data = await response.json();
          if (!response.ok) {
            alert(data);
            throw new Error(data.error);
          }
          alert("producto Actualizado");
          actions.setSubmitting(false);
          actions.resetForm();
          navigate("/home/products");
        } catch (error) {
          alert(error.message);
        }
      } else {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}componente/`,
            {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          if (!response.ok) {
            alert(data);
            throw new Error(data.error);
          }
          alert("producto guardado");
          actions.setSubmitting(false);
          actions.resetForm();
        } catch (error) {
          alert(error.message);
        }
      }
    },
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}marca/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };
    fetchMarcas();
  }, []);

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}marca/modelo/${values.marca}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();
        setModelos(data);
      } catch (error) {
        console.error("Error al obtener los Modelos:", error);
      }
    };
    if (values.marca !== "") {
      fetchModelos();
    }
  }, [values.marca]);

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
          defaultValue={initialValues.nombre}
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.nombre && Boolean(errors.nombre)}
          helperText={touched.nombre && errors.nombre}
          sx={{ mr: 2 }}
        />

        {/* <Box sx={{ display: "flex", mb: 2 }}> */}
        <FormControl
          size="small"
          error={touched.marca && Boolean(errors.marca)}
          sx={{
            width: "100%",
            mt: 2,
          }}
        >
          <InputLabel htmlFor="marca" id="marca_label">
            Marca del dispositivo
          </InputLabel>
          <Select
            id="marca"
            labelId="marca_label"
            name="marca"
            label="Marca del dispositivo"
            value={marcas.find((marca) => marca.id === values.marca)?.id || ""}
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
          <InputLabel htmlFor="modelos_id" id="modelos_id_label">
            Modelo del dispositivo
          </InputLabel>
          <Select
            id="modelos_id"
            label="Modelo del dispositivo"
            labelId="modelos_id_label"
            name="modelos_id"
            // disabled={!values.marca}
            value={
              modelos.find((modelo) => modelo.id === values.modelos_id)?.id ||
              ""
            }
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
        {/* </Box> */}
      </Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          id="cantidad"
          size="small"
          name="cantidad"
          label="Cantidad"
          type="number"
          InputLabelProps={{
            shrink: producto?.cantidad && true,
          }}
          defaultValue={initialValues.cantidad}
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
          defaultValue={initialValues.precio}
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
          {isSubmitting ? "Guardando" : "Guardar Producto"}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormProduct;
