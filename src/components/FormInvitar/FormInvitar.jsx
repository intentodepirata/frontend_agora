import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const users = [
  { id: 1, name: "Antonio Alvarez", role: "propietario" },
  { id: 2, name: "Jane Smith", role: "tecnico" },
  { id: 3, name: "Mike Johnson", role: "recepcionista" },
];

export default function FormInvitar() {
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("seleccione");
  return (
    <Paper
      elevation={1}
      sx={{ border: "1px solid #C4C4C4", mt: 2, width: "100%", p: 2 }}
    >
      <Box
        display={"flex"}
        sx={{ p: 2 }}
        alignItems={"center"}
        justifyContent={"space-between"}
        maxWidth={"800px"}
        margin={"0 auto"}
      >
        <Box
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
            Envia una invitación a los todos los miembros de tu equipo
          </Typography>
          <Box sx={{ display: "flex" }} mb={2}>
            <TextField
              fullWidth
              id="email"
              label="Email de contacto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
            />
          </Box>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="rol-label">Seleccionar Rol</InputLabel>
            <Select
              fullWidth
              labelId="rol-label"
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              label="Seleccionar Rol"
            >
              <MenuItem value="seleccione">Seleccionar rol</MenuItem>
              <MenuItem value="tecnico">Técnico</MenuItem>
              <MenuItem value="recepcionista">Recepcionista</MenuItem>
            </Select>
          </FormControl>
          <Button
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
          src={`/img/${rol}.png`}
          alt="Rol"
        />
      </Box>

      <Box sx={{ p: 2 }} maxWidth={"800px"} margin={"0 auto"}>
        <Typography variant="h6" color="primary" mb={2} fontWeight={"bold"}>
          Listado de usuarios
        </Typography>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {users.map((user) => (
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              key={user.id}
            >
              <ListItemText sx={{ width: "100%" }}>{user.name}</ListItemText>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <InputLabel size="small" id={`rol-label-${user.id}`}>
                  Rol
                </InputLabel>
                <Select
                  labelId={`rol-label-${user.id}`}
                  id={`rol-${user.id}`}
                  value={user.role}
                  size="small"
                  disabled={user.role === "propietario"} // Desactivar el Select para el propietario
                  label="Rol"
                  sx={{ width: "100%" }} // Ajustar el ancho del Select según sea necesario
                >
                  <MenuItem value="propietario">Propietario</MenuItem>
                  <MenuItem value="tecnico">Técnico</MenuItem>
                  <MenuItem value="recepcionista">Recepcionista</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
