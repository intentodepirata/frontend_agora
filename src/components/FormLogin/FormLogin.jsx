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
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormLoginSchema } from "./FormLoginSchema";
import { useSnackbar } from "notistack";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
    validationSchema: FormLoginSchema,
    onSubmit: async function (values, actions) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}user/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.status !== 200) {
        enqueueSnackbar(`${data}`, {
          variant: "error",
          // action: (key) => closeSnackbar(key),
        });
      } else {
        login(data);

        navigate("/home");
        actions.resetForm();
        enqueueSnackbar(`Bienvenido ${data.nombre} ${data.apellidos}`, {
          variant: "success",
        });
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
          Iniciar sesión
        </Typography>
        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
          Inicia sesion con tus datos anteriores
        </Typography>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            size="small"
            label="Correo electronico"
            sx={{ mb: 4, bgcolor: "#F3F4F6" }}
          /> */}

          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mb: 4, bgcolor: "#F3F4F6" }}
          >
            <InputLabel
              error={touched.email && Boolean(errors.email)}
              htmlFor="email"
            >
              Correo electrónico
            </InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              label="Correo electrónico"
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
          <Typography
            component={Link}
            to="/forgot"
            variant="body1"
            color="primary"
            sx={{ mb: 4 }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "14px", py: "14" }}
          >
            Iniciar sesion
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormLogin;
