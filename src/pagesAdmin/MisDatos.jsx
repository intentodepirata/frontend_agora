import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import useScrollUp from "../hooks/useScrollUp";
import { initialUserValues } from "./utils/initialValues";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/users";
import { enqueueSnackbar } from "notistack";

const MisDatos = () => {
  const [userValues, setUserValues] = useState(initialUserValues);
  const [errors, setErrors] = useState(false);
  const { user, login } = useUserContext();
  useScrollUp();

  useEffect(() => {
    setUserValues({
      nombre: user.nombre,
      email: user.email,
      apellidos: user.apellidos,
      telefono: user.telefono,
      fechaRegistro: user.fechaRegistro,
    });
  }, [user]);

  const handleChange = (e) => {
    setErrors(false);
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const updateMutaton = useMutation({
    mutationFn: (values) => updateUser(values, user.token),
    onSuccess: () => {
      login({
        ...user,
        ...userValues,
      });
      enqueueSnackbar("Datos actualizados", {
        variant: "success",
      });
    },
    onError: (error) => console.error(error.message),
  });

  const handleSubmit = () => {
    if (
      userValues.nombre === "" ||
      userValues.apellidos === "" ||
      userValues.telefono === ""
    ) {
      setErrors(true);
      enqueueSnackbar("Todos los campos son obligatorios", {
        variant: "error",
      });
      return;
    }

    updateMutaton.mutate({
      nombre: userValues.nombre,
      apellidos: userValues.apellidos,
      telefono: userValues.telefono,
    });
  };
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
          Mis datos
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

      <Paper
        elevation={1}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            id="nombre"
            label="Nombre usuario"
            name="nombre"
            value={userValues.nombre}
            onChange={handleChange}
            size="small"
            sx={{ mr: 2 }}
            error={errors}
          />
          <TextField
            fullWidth
            id="apellidos"
            name="apellidos"
            label="Apellidos usuario"
            value={userValues.apellidos}
            onChange={handleChange}
            size="small"
            error={errors}
          />
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            id="telefono"
            name="telefono"
            label="telefono usuario"
            value={userValues.telefono}
            onChange={handleChange}
            size="small"
            sx={{ mr: 2 }}
            error={errors}
          />
          <TextField
            fullWidth
            id="fechaRegistro"
            label="Fecha de registro"
            value={userValues.fechaRegistro}
            size="small"
            disabled
          />
        </Box>
        <TextField
          fullWidth
          id="correo"
          label="Correo usuario"
          name="correo"
          value={userValues.email}
          size="small"
          disabled
        />
      </Paper>
    </>
  );
};

export default MisDatos;
