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
import { FormResetPasswordSchema } from "./FormResetPasswordSchema";

const FormResetpassword = ({ resetPasswordMutation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: FormResetPasswordSchema,
      onSubmit: async function (values, actions) {
        resetPasswordMutation.mutate(values);
        actions.resetForm();
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
        <Typography component="h2" variant="h6" color="initial" sx={{ mb: 2 }}>
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
            error={touched.password && Boolean(errors.password)}
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
            {touched.password && errors.password && (
              <FormHelperText sx={{ backgroundColor: "white", px: 1, mx: 0 }}>
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            disabled={resetPasswordMutation.isLoading}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "14px", py: "14", mb: 4 }}
          >
            {resetPasswordMutation.isLoading ? (
              <>
                Guardando contraseña...
                <CircularProgress size="1rem" color="grey" sx={{ ml: 2 }} />
              </>
            ) : (
              "Guardar contraseña"
            )}
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
