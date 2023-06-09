import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { FormRegisterSchema } from "./FormRegisterSchema";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { useUserContext } from "../../contexts/UserContext";
import { addUser } from "../../api/usuarios";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUserContext();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

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
    validationSchema: FormRegisterSchema,
    onSubmit: async function (values, actions) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}user/register`,
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

        alert(
          "Usuario registrado exitosamente, se ha enviado un correo electronico de confirmacion a su cuenta de correo"
        );
        actions.resetForm();
      } catch (error) {
        alert("Error al registrar usuario: " + error.message);
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
          Registra tu cuenta
        </Typography>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          Rellena todos los campos para crear una cuenta
        </Typography>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="Nombre"
            size="small"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
            sx={{ mb: 4, bgcolor: "#F3F4F6" }}
          />
          <TextField
            label="Apellidos"
            size="small"
            name="apellidos"
            value={values.apellidos}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.apellidos && Boolean(errors.apellidos)}
            helperText={touched.apellidos && errors.apellidos}
            sx={{ mb: 4, bgcolor: "#F3F4F6" }}
          />

          <TextField
            name="telefono"
            size="small"
            type="number"
            value={values.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.telefono && Boolean(errors.telefono)}
            helperText={touched.telefono && errors.telefono}
            label="Telefono"
            sx={{ mb: 4, bgcolor: "#F3F4F6" }}
          />
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            size="small"
            label="Correo electronico"
            sx={{ mb: 4, bgcolor: "#F3F4F6" }}
          />
          <FormControl
            sx={{ mb: 2, width: "100%", bgcolor: "#F3F4F6" }}
            variant="outlined"
          >
            <InputLabel
              error={touched.password && Boolean(errors.password)}
              size="small"
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              size="small"
              aria-describedby="my-helper-text"
              id="outlined-adornment-password"
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
              label="Password"
            />
            <FormHelperText
              sx={{ backgroundColor: "white", px: 1, mx: 0 }}
              error={touched.password && Boolean(errors.password)}
              id="my-helper-text"
            >
              {touched.password && errors.password}
            </FormHelperText>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Tengo un codigo promocional"
            />
            <FormControlLabel
              sx={{ pb: 4 }}
              required
              name="acceptedTC"
              control={<Checkbox />}
              label="He leído y acepto los términos y condiciones y la política de privacidad."
            />
          </FormGroup>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "14px", py: "14", mb: 4 }}
          >
            Crear Cuenta
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

export default FormRegister;
