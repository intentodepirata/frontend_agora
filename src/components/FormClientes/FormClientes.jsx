import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormClientesSchema } from "./FormClientesSchema";
import { useNavigate } from "react-router-dom";

const FormClientes = ({
  createCustomerMutation,
  updateCustomerMutation,
  cliente,
}) => {
  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: cliente ? cliente : initialValues,
      validationSchema: FormClientesSchema,
      onSubmit: async function (values, actions) {
        if (cliente) {
          updateCustomerMutation?.mutate(values);
          actions.resetForm();
        } else {
          createCustomerMutation?.mutate(values);
          window.location.href ===
            `${import.meta.env.VITE_URL}home/clientes/create` &&
            navigate("/home/clientes");
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
          width: "100%",
        }}
      >
        <Typography
          sx={{ textAlign: "left", mb: 1 }}
          fontWeight={"bold"}
          variant="h6"
          color={createCustomerMutation?.isSuccess ? "primary" : "grey"}
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
            disabled={createCustomerMutation?.isSuccess}
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
            disabled={createCustomerMutation?.isSuccess}
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
            disabled={createCustomerMutation?.isSuccess}
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
            disabled={createCustomerMutation?.isSuccess}
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
            disabled={createCustomerMutation?.isSuccess}
            value={values.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.direccion && Boolean(errors.direccion)}
            helperText={touched.direccion && errors.direccion}
            sx={{ width: "75%", mr: 2 }}
          />
          <Button
            disabled={createCustomerMutation?.isSuccess}
            sx={{ width: "25%", textTransform: "none", height: "40px" }}
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            {createCustomerMutation?.isSuccess
              ? "Cliente Guardado"
              : cliente
              ? "Actualizar"
              : "Guardar Cliente"}
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default FormClientes;
