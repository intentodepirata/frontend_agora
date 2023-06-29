import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function FormNegocio({
  nombre,
  setNombre,
  telefono,
  setTelefono,
  pais,
  setPais,
  precio,
  setPrecio,
  direccion,
  setDireccion,
  logo,
  setLogo,
  subirImagen,
  logoUrl,
  borrarImagen,
}) {
  return (
    <>
      <Paper elevation={1} sx={{ border: "1px solid #C4C4C4" }}>
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="initial" mb={2}>
            Datos de mi negocio:
          </Typography>
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
      <Paper elevation={1} sx={{ border: "1px solid #C4C4C4", mt: 4, p: 4 }}>
        <Typography variant="body1" color="initial" mb={2}>
          Logo:
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
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => subirImagen()}
              >
                Subir Logo
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => borrarImagen()}
              >
                Eliminar Logo
              </Button>
            </Stack>
          </Box>
          <Box
            mt={2}
            component={"img"}
            src={logoUrl}
            width={"60%"}
            p={10}
            sx={{
              mx: "auto",
            }}
          />
        </Box>
      </Paper>
    </>
  );
}
