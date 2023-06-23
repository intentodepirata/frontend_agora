import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormForgotSchema } from "./FormForgotSchema";
import { enqueueSnackbar } from "notistack";

const FormForgot = () => {
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
    initialValues,
    validationSchema: FormForgotSchema,
    onSubmit: async function (values, actions) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}user/forgot-password`,
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        enqueueSnackbar(
          "Instrucciones enviadas, revise su bandeja de entrada",
          {
            variant: "success",
          }
        );
        actions.resetForm();
      } catch (error) {
        enqueueSnackbar("Error al restablecer su password", {
          variant: "error",
        });
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Paper sx={{ p: 2, margin: "3rem auto", maxWidth: "400px" }}>
      <Box sx={{ p: 2 }}>
        <Typography
          textAlign="center"
          component="h1"
          variant="h4"
          color="initial"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          Restablezca su contraseña
        </Typography>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          Introduzca su email para enviar instrucciones
        </Typography>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              mb: touched.email && errors.email ? 1 : 4,
              bgcolor: "#F3F4F6",
            }}
          >
            <InputLabel
              error={touched.email && Boolean(errors.email)}
              htmlFor="email"
            >
              Correo electronico
            </InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              label="Correo electronico"
            />
            {touched.email && errors.email && (
              <FormHelperText
                sx={{ backgroundColor: "white", px: 1, mx: 0 }}
                error
              >
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "14px", py: "14", mb: 4 }}
          >
            Enviar instrucciones
          </Button>
          <Typography textAlign={"center"} variant="body1" color="initial">
            {" "}
            ¿Ya tienes cuenta?{" "}
            <Typography
              component={Link}
              to="/login"
              variant="body1"
              color="primary"
              sx={{ mb: 4 }}
            >
              Inicia sesión
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormForgot;
