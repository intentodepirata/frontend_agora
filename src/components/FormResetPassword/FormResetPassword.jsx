import {
  Box,
  Paper,
  Typography,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormResetPasswordSchema } from "./FormResetPasswordSchema";
import { enqueueSnackbar } from "notistack";

const FormResetpassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const { token } = useParams();
  const decodedToken = decodeURIComponent(token);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    initialValues,
    validationSchema: FormResetPasswordSchema,
    onSubmit: async function (values, actions) {
      try {
        actions.setSubmitting(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}user/reset-password/${decodedToken}`,
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

        enqueueSnackbar("Contraseña restablecida");
        actions.resetForm();
        navigate("/login");
        actions.setSubmitting(false);
      } catch (error) {
        alert("Error al resetear el password: " + error.message);
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
          Nueva contraseña
        </Typography>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          Elije una nueva contraseña
        </Typography>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <FormControl
            sx={{ mb: 4, width: "100%", bgcolor: "#F3F4F6" }}
            variant="outlined"
          >
            <InputLabel size="small" htmlFor="password">
              Elige una contraseña
            </InputLabel>
            <OutlinedInput
              size="small"
              sx={{ display: "flex", alignItems: "center" }}
              name="password"
              label="Elige una contraseña"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment size="small" position="end">
                  <IconButton
                    size="small"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff size="small" />
                    ) : (
                      <Visibility size="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "14px", py: "14", mb: 4 }}
          >
            Guardar Constraseña
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

export default FormResetpassword;
