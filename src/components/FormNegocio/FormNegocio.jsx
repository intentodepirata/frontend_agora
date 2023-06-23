import { PaidSharp } from "@mui/icons-material";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

export default function FormNegocio() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [precio, setPrecio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [logo, setLogo] = useState(null);
  return (
    <Box width={"100%"}>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex" }} mb={2}>
            <TextField
              id="negocio"
              label="Nombre del negocio"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              size="small"
              sx={{ mr: 2, width: "50%" }}
            />
            <TextField
              id="telefono"
              label="Telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              size="small"
              sx={{ width: "50%" }}
            />
          </Box>
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              id="pais"
              label="Pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              size="small"
              sx={{ mr: 2, width: "50%" }}
            />
            <TextField
              id="precio"
              label="Precio/hora"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              size="small"
              sx={{ width: "50%" }}
            />
          </Box>
          <TextField
            fullWidth
            id="direccion"
            label="Direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            multiline
            rows={2}
            variant="filled"
          />
        </Box>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          mt: 4,
          p: 2,
          width: "100%",
        }}
      >
        <Box p={2}>
          <Typography variant="body1" color="initial" mb={2}>
            Logo
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MuiFileInput
                size="small"
                value={logo}
                onChange={(imagen) => setLogo(imagen)}
                placeholder="Imagen Logo"
              />
              <Button variant="outlined" color="error">
                Eliminar Logo
              </Button>
            </Box>
            <Box
              mt={2}
              component={"img"}
              src="public/img/logo.png"
              width={"100%"}
              p={10}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
