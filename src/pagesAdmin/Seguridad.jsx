import {
  Box,
  Paper,
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
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
const initialValues = { password: "" };
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Debe contener un minimo de 5 caracteres, 1 mayuscula, 1 minuscula y 1 numero",
    })
    .required("Requerido"),
});

const Seguridad = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useUserContext();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
    validationSchema: passwordSchema,
    onSubmit: async function (values, actions) {
      // actions.setSubmitting(true);
      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}user/login`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(values),
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // const data = await response.json();
      // if (response.status !== 200) {
      //   enqueueSnackbar(`${data}`, {
      //     variant: "error",
      //   });
      // } else {
      //   login(data);

      //   navigate("/home");
      //   actions.resetForm();
      //   enqueueSnackbar(`Bienvenido ${data.nombre} ${data.apellidos}`, {
      //     variant: "success",
      //   });
      // }
      actions.setSubmitting(false);
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial" sx={{ p: 2 }}>
          Seguridad
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Formulario para restablecer contraseña
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Box width={"100%"}>
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
        </Box>
      </Box>
    </>
  );
};

export default Seguridad;
