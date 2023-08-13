import {
  Box,
  Typography,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useFormik } from "formik";
import { useState } from "react";
import useScrollUp from "../hooks/useScrollUp";
import { passwordSchema } from "./utils/passwordSchema";

import { initialPasswordValues } from "./utils/initialValues";
import { updateUserPassword } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Seguridad = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useUserContext();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialPasswordValues,
      validationSchema: passwordSchema,
      onSubmit: async function (values, actions) {
        updateMutation.mutate(values);
        actions.resetForm();
      },
    });

  const updateMutation = useMutation({
    mutationFn: (values) => updateUserPassword(values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Datos actualizados", {
        variant: "success",
      });
    },
    onError: (error) => console.error(error.message),
  });

  useScrollUp();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
          my: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial">
          Seguridad
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Formulario para restablecer contraseña
      </Typography>

      <Box
        sx={{
          p: 3,
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #E0E0E0",
        }}
      >
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
            Nuevo Password
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
            label="Nuevo Password"
          />
          <FormHelperText
            sx={{ backgroundColor: "white", px: 1, mx: 0 }}
            error={touched.password && Boolean(errors.password)}
            id="my-helper-text"
          >
            {touched.password && errors.password}
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );
};

export default Seguridad;
