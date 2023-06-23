import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function FormPlantillas() {
  const [plantilla, setPlantilla] = useState("");
  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        borderRadius: "4px",
        border: "1px solid #E0E0E0",
      }}
    >
      <Typography variant="body1" color="initial" mb={2}>
        Aquí puedes agregar las políticas de garantía que saldrán en tus
        facturas para que el cliente las lea y firme.
      </Typography>

      <TextField
        fullWidth
        id="plantilla"
        label="Introduce tu texto aqui"
        value={plantilla}
        onChange={(e) => setPlantilla(e.target.value)}
        multiline
        rows={4}
        variant="filled"
      />
    </Box>
  );
}
