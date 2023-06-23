import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { useState } from "react";

const MisDatos = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const { user } = useUserContext();

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
      <Typography textAlign={"center"} variant="h6" color="grey">
        Formulario de nombre y correo
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
            <TextField
              width="30%"
              id="nombre"
              label="Nombre usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              size="small"
              sx={{ mr: 2 }}
            />
            <TextField
              width="30%"
              id="correo"
              label="Correo usuario"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MisDatos;
