import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormInvitarSchema } from "./FormInvitarSchema";
import { useUserContext } from "../../contexts/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";

export default function FormInvitar() {
  const [showPassword, setShowPassword] = useState(false);
  const [employees, setEmployees] = useState([]);
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
    validationSchema: FormInvitarSchema,
    onSubmit: async function (values, actions) {
      try {
        actions.setSubmitting(true);
        const invitado = {
          ...values,
          superior_id: user.id,
        };

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}user/register`,
          {
            method: "POST",
            body: JSON.stringify(invitado),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          enqueueSnackbar("Error al enviar invitacion", { variant: "error" });
          actions.resetForm();
          actions.setSubmitting(false);
          throw new Error(data.error);
        }

        enqueueSnackbar("Invitacion enviada correctamente", {
          variant: "success",
        });
        actions.resetForm();
        actions.setSubmitting(false);
        getEmployees();
      } catch (error) {
        console.error(error.message);
      }
    },
  });
  const getEmployees = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}user/employees/${user.id}`
      );

      const data = await response.json();
      if (!response.ok) {
        console.error(data.error);
        setEmployees([user]);
        return;
      }
      setEmployees(data);
      setEmployees((values) => {
        return [...values, user];
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);
  const handleConfirmar = (id, snackbarId) => {
    console.log("confirmado" + id);
    fetchDeleteEmployee(id);
    closeSnackbar(snackbarId);
  };

  const fetchDeleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}user/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        enqueueSnackbar(data.error, { variant: "error" });
        return;
      }
      enqueueSnackbar("El empleado ha sido eliminado", { variant: "success" });
      getEmployees();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteEmployee = (id) => {
    enqueueSnackbar("Desear eliminar al empleado?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => handleConfirmar(id, snackbarId)}
            color="primary"
          >
            Confirmar
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Cancelar
          </Button>
        </Stack>
      ),
    });
  };

  return (
    <Paper
      elevation={1}
      sx={{ border: "1px solid #C4C4C4", mt: 2, width: "100%", p: 2 }}
    >
      <Box display={"flex"} sx={{ p: 4 }} alignItems={"center"}>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          mr={4}
        >
          <Typography variant="h6" color="primary" mb={2} fontWeight={"bold"}>
            Invita a tu equipo
          </Typography>
          <Typography variant="subtitle1" color="grey" mb={2}>
            Envia una invitación a los miembros de tu equipo
          </Typography>
          <Box sx={{ display: "flex" }}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                mb: touched.nombre && errors.nombre ? 1 : 2,

                width: "50%",
                mr: 2,
              }}
            >
              <InputLabel
                error={touched.nombre && Boolean(errors.nombre)}
                htmlFor="nombre"
              >
                Nombre
              </InputLabel>
              <OutlinedInput
                id="nombre"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.nombre && Boolean(errors.nombre)}
                label="Nombre"
              />
              {touched.nombre && errors.nombre && (
                <FormHelperText
                  sx={{ backgroundColor: "white", px: 1, mx: 0 }}
                  error
                >
                  {errors.nombre}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              variant="outlined"
              size="small"
              sx={{
                mb: touched.apellidos && errors.apellidos ? 1 : 2,

                width: "50%",
              }}
            >
              <InputLabel
                error={touched.apellidos && Boolean(errors.apellidos)}
                htmlFor="apellidos"
              >
                Apellidos
              </InputLabel>
              <OutlinedInput
                id="apellidos"
                name="apellidos"
                value={values.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.apellidos && Boolean(errors.apellidos)}
                label="Apellidos"
              />
              {touched.apellidos && errors.apellidos && (
                <FormHelperText
                  sx={{ backgroundColor: "white", px: 1, mx: 0 }}
                  error
                >
                  {errors.apellidos}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                mb: touched.email && errors.email ? 1 : 2,
                width: "50%",
                mr: 2,
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

            <FormControl
              sx={{
                mb: touched.password && errors.password ? 1 : 2,
                width: "50%",
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
                id="my-helper-text"
              >
                {touched.password && errors.password}
              </FormHelperText>
            </FormControl>
          </Box>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="rol-label">Seleccionar Rol</InputLabel>
            <Select
              fullWidth
              labelId="rol-label"
              id="rol"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Seleccionar Rol"
            >
              <MenuItem value="1">Seleccionar rol</MenuItem>
              <MenuItem value="2">Técnico</MenuItem>
              <MenuItem value="3">Recepcionista</MenuItem>
            </Select>
          </FormControl>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Enviar
          </Button>
        </Box>

        <Box
          p={4}
          width={"300px"}
          height={"300px"}
          component={"img"}
          src={`/img/${values.role}.png`}
          mx={"auto"}
          alt="Rol"
        />
      </Box>

      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="primary" mb={2} fontWeight={"bold"}>
          Listado de usuarios
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid grey",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              color="initial"
              mb={1}
              sx={{ width: "100%", p: 1 }}
            >
              Nombre
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              mb={1}
              sx={{ width: "100%", p: 1 }}
            >
              Correo
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              mb={1}
              sx={{ width: "100%", p: 1 }}
            >
              Confirmado
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              mb={1}
              sx={{ width: "100%", p: 1 }}
            >
              Rol
            </Typography>
          </Box>
          {employees.map((user) => (
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              key={user.id}
            >
              <ListItemText sx={{ width: "100%", p: 1 }}>
                {user.nombre}
              </ListItemText>
              <ListItemText sx={{ width: "100%", p: 1 }}>
                {user.email}
              </ListItemText>
              <ListItemText sx={{ width: "100%", p: 1 }}>
                {user.confirmado == 1 ? "Si" : "No"}
              </ListItemText>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <InputLabel size="small" id={`rol-label-${user.id}`}>
                  Rol
                </InputLabel>
                <Select
                  labelId={`rol-label-${user.id}`}
                  id={`rol-${user.id}`}
                  value={user.role}
                  size="small"
                  disabled={user.role == "1"} // Desactivar el Select para el propietario
                  label="Rol"
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="1">Propietario</MenuItem>
                  <MenuItem value="2">Técnico</MenuItem>
                  <MenuItem value="3">Recepcionista</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDeleteEmployee(user.id)}
                sx={{ mb: 2 }}
                disabled={user.role == "1"}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
