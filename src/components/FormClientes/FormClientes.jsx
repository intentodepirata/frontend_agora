import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormClientesSchema } from "./FormClientesSchema";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { createCustomer } from "../../api/clientes";

const FormClientes = ({ setCliente_id, cliente }) => {
  const { user } = useUserContext();
  const [guardado, setGuardado] = useState(false);
  const urlCompleta = window.location.href;

  const navigate = useNavigate();

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      enqueueSnackbar("Cliente creado correctamente", {
        variant: "success",
      });
    },
  });
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
    initialValues: cliente ? cliente : initialValues,
    validationSchema: FormClientesSchema,
    onSubmit: async function (values, actions) {
      //   try {
      //     const token = user.token;
      //     const url = cliente
      //       ? `${import.meta.env.VITE_API_URL}cliente/${cliente.id}`
      //       : `${import.meta.env.VITE_API_URL}cliente/`;

      //     const response = await fetch(url, {
      //       method: cliente ? "PUT" : "POST",
      //       body: JSON.stringify(values),
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     });
      //     const data = await response.json();

      //     if (!response.ok) {
      //       throw new Error(data.error);
      //     }

      //     if (cliente) {
      //       enqueueSnackbar("Cliente actualizado correctamente", {
      //         variant: "info",
      //       });
      //       actions.resetForm();
      //       navigate("/home/clientes");
      //     } else {
      //       enqueueSnackbar("Cliente Guardado Correctamente", {
      //         variant: "success",
      //       });
      //       setGuardado(true);

      //       urlCompleta === `${import.meta.env.VITE_URL}home/clientes/create` &&
      //         navigate("/home/clientes");
      //       setCliente_id(data);
      //     }
      //   } catch (error) {}
      //   actions.setSubmitting(false);

      createCustomerMutation.mutate(values);
      actions.resetForm();
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
          sx={{ textAlign: "left", mb: 1 }}
          fontWeight={"bold"}
          variant="h6"
          color={guardado ? "primary" : "grey"}
        >
          Datos Cliente
        </Typography>
        <Typography variant="body1" color="grey" mb={2}>
          Rellene todos los campos para agregar un cliente
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            size="small"
            name="dni"
            label="DNI"
            InputLabelProps={{ shrink: cliente?.dni && true }}
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
            InputLabelProps={{ shrink: cliente?.nombre && true }}
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
            autoComplete="email"
            label="Correo electronico"
            InputLabelProps={{ shrink: cliente?.email && true }}
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
            InputLabelProps={{ shrink: cliente?.telefono && true }}
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
            InputLabelProps={{ shrink: cliente?.direccion && true }}
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
