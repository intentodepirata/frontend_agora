import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormClientesSchema } from "./FormClientesSchema";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

const FormClientes = ({ setCliente_id }) => {
  const { user } = useUserContext();
  const [guardado, setGuardado] = useState(false);
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
    validationSchema: FormClientesSchema,
    onSubmit: async function (values, actions) {
      try {
        const token = user.token;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}cliente/`,
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
          throw new Error(data.error);
        }
        console.log(data);
        alert("cliente guardado");
        setCliente_id(data);
        setGuardado(true);
      } catch (error) {
        alert(error.message);
        actions.setSubmitting(false);
      }
    },
  });
  return (
    <>
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
          sx={{ textAlign: "center", mb: 1 }}
          fontWeight={"bold"}
          variant="h6"
          color={guardado ? "primary" : "grey"}
        >
          Datos Cliente
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            size="small"
            name="dni"
            label="DNI"
            disabled={guardado}
            value={values.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dni && Boolean(errors.dni)}
            helperText={touched.dni && errors.dni}
            sx={{ mr: 2, width: "25%" }}
          />
          <TextField
            size="small"
            label="Nombre completo"
            name="nombre"
            disabled={guardado}
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
            sx={{ width: "75%" }}
          />
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            size="small"
            name="email"
            label="Correo electronico"
            disabled={guardado}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ width: "75%", mr: 2 }}
          />
          <TextField
            size="small"
            name="telefono"
            label="Telefono de contacto"
            disabled={guardado}
            value={values.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.telefono && Boolean(errors.telefono)}
            helperText={touched.telefono && errors.telefono}
            sx={{ width: "25%" }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            size="small"
            name="direccion"
            label="Direccion completa"
            disabled={guardado}
            value={values.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.direccion && Boolean(errors.direccion)}
            helperText={touched.direccion && errors.direccion}
            sx={{ width: "75%", mr: 2 }}
          />
          <Button
            disabled={isSubmitting}
            sx={{ width: "25%", textTransform: "none", height: "40px" }}
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            {guardado ? "Cliente Guardado" : "Guardar Cliente"}
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default FormClientes;
