import { useFormik } from "formik";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { initialValues } from "./utils/initialValues";
import { FormProveedoresSchema } from "./utils/FormProveedoresSchema";
import { enqueueSnackbar } from "notistack";

const FormProveedores = ({ proveedor }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

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
    initialValues: proveedor ? proveedor : initialValues,
    validationSchema: FormProveedoresSchema,
    onSubmit: async function (values, actions) {
      const token = user.token;
      const url = proveedor
        ? `${import.meta.env.VITE_API_URL}proveedores/${proveedor.id}`
        : `${import.meta.env.VITE_API_URL}proveedores/`;

      try {
        const response = await fetch(url, {
          method: proveedor ? "PUT" : "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        if (proveedor) {
          enqueueSnackbar("Proveedor actualizado correctamente", {
            variant: "success",
          });
          actions.resetForm();
          navigate("/home/suppliers");
        } else {
          enqueueSnackbar("Proveedor guardado correctamente", {
            variant: "success",
          });
          actions.resetForm();
          navigate("/home/suppliers");
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }

      actions.setSubmitting(false);
    },
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
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{ mb: 1 }}
          fontWeight={"bold"}
          variant="h5"
          color={"primary"}
        >
          {proveedor ? "Editar proveedor" : "Nuevo proveedor"}
        </Typography>
        <Typography
          sx={{ mb: 2 }}
          fontWeight={"bold"}
          variant="body1"
          color={"grey"}
        >
          Rellene todos los campos para agregar un proveedor
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TextField
            size="small"
            name="empresa"
            label="Empresa"
            InputLabelProps={{
              shrink: proveedor?.empresa && true,
            }}
            value={values.empresa}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.empresa && Boolean(errors.empresa)}
            helperText={touched.empresa && errors.empresa}
            sx={{ mr: 2, width: "50%" }}
          />
          <TextField
            id="web"
            size="small"
            name="web"
            label="Sitio Web"
            type="url"
            InputLabelProps={{
              shrink: proveedor?.web && true,
            }}
            value={values.web}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.web && Boolean(errors.web)}
            helperText={touched.web && errors.web}
            sx={{ width: "50%" }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          id="nombre"
          size="small"
          name="nombre"
          label="Persona de contacto"
          InputLabelProps={{
            shrink: proveedor?.nombre && true,
          }}
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.nombre && Boolean(errors.nombre)}
          helperText={touched.nombre && errors.nombre}
          sx={{ width: "50%", mr: 2 }}
        />

        <TextField
          id="email"
          size="small"
          name="email"
          label="Email"
          type="email"
          InputLabelProps={{
            shrink: proveedor?.email && true,
          }}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          sx={{ width: "50%", mr: 2 }}
        />
        <TextField
          id="telefono"
          size="small"
          name="telefono"
          label="Telefono"
          type="tel"
          InputLabelProps={{
            shrink: proveedor?.telefono && true,
          }}
          value={values.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.telefono && Boolean(errors.telefono)}
          helperText={touched.telefono && errors.telefono}
          sx={{ width: "50%" }}
        />
      </Box>
      <TextField
        id="descripcion"
        size="small"
        name="descripcion"
        label="Descripcion"
        InputLabelProps={{
          shrink: proveedor?.descripcion && true,
        }}
        value={values.descripcion}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.descripcion && Boolean(errors.descripcion)}
        helperText={touched.descripcion && errors.descripcion}
        sx={{ width: "100%", mb: 2 }}
      />
      <Box>
        <Button
          disabled={isSubmitting}
          sx={{ textTransform: "none" }}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {isSubmitting ? "Guardando" : "Guardar proveedor"}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormProveedores;
