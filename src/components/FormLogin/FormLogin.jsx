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
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { FormLoginSchema } from "./FormLoginSchema";

const FormLogin = ({ loginMutation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: FormLoginSchema,
      onSubmit: async function (values, actions) {
        loginMutation.mutate(values);
        actions.resetForm();
      },
    });

  return (
    <Paper sx={{ px: 2, py: 4, margin: "3rem auto", maxWidth: "662px" }}>
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
        <Typography component="h2" variant="h6" color="initial" sx={{ mb: 2 }}>
          Inicia sesión con tus datos anteriores
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
            sx={{
              mb: touched.password && errors.password ? 1 : 2,
              bgcolor: "#F3F4F6",
            }}
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
            >
              {touched.password && errors.password}
            </FormHelperText>
          </FormControl>
          <Typography
            component={Link}
            to="/forgot"
            variant="body2"
            color="primary"
            sx={{ mb: 4 }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
          <Button
            disabled={loginMutation.isLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "14px", py: "14" }}
          >
            {loginMutation.isLoading ? (
              <>
                Iniciando Sesión...
                <CircularProgress size="1rem" color="grey" sx={{ ml: 2 }} />
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
          <Typography
            component={"div"}
            variant="body2"
            color="inherit"
            sx={{ mt: 4, textAlign: "center" }}
          >
            ¿Aún no tienes cuenta?
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              color="primary"
              sx={{ mt: 4, textAlign: "center" }}
            >
              {" "}
              Regístrate
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormLogin;
