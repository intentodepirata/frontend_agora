import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import useScrollUp from "../hooks/useScrollUp";

const MisDatos = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const { user } = useUserContext();
  useScrollUp();
  useEffect(() => {
    setNombre(user.nombre);
    setCorreo(user.email);
    setApellidos(user.apellidos);
    setTelefono(user.telefono);
    setFechaRegistro(user.fechaRegistro);
  }, []);
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            size="small"
            sx={{ mr: 2 }}
          />
          <TextField
            fullWidth
            id="apellidos"
            label="Apellidos usuario"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            size="small"
          />
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            id="telefono"
            label="telefono usuario"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            size="small"
            sx={{ mr: 2 }}
          />
          <TextField
            fullWidth
            id="fechaRegistro"
            label="Fecha de registro"
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            size="small"
          />
        </Box>
        <TextField
          fullWidth
          id="correo"
          label="Correo usuario"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          size="small"
          disabled
        />
      </Paper>
    </>
  );
};

export default MisDatos;
