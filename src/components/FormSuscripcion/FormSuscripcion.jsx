import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FormSuscripcion() {
  const [fecha, setFecha] = useState("");
  useEffect(() => {
    const obtenerFechaDelServidor = () => {
      const fechaServidor = new Date(); // Reemplaza esta línea con la lógica real de obtención de la fecha del servidor
      const fechaUnMesDespues = new Date(
        fechaServidor.getFullYear(),
        fechaServidor.getMonth() + 1,
        fechaServidor.getDate()
      );
      setFecha(fechaUnMesDespues.toISOString().split("T")[0]);
    };

    obtenerFechaDelServidor();
  }, []);

  return (
    <>
      <Paper
        elevation={1}
        sx={{ border: "1px solid #C4C4C4", mt: 2, width: "100%" }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            maxWidth: 800,
          }}
          width={"100%"}
        >
          <Box width={"50%"}>
            <Typography variant="body1" color="initial" mb={1}>
              Tu plan:
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              size="medium"
              sx={{
                mr: 2,

                p: 0.8,
              }}
            >
              Gestionar Suscripcion
            </Button>
          </Box>
          <Box width={"50%"}>
            <Typography mb={1} variant="body1" color="initial">
              Vence el dia:
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="limite"
              name="limite"
              InputLabelProps={{ shrink: true }}
              disabled={true}
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              sx={{ mr: 2, width: "50%", bgcolor: "grey.100" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Typography p={2} component={Link} variant="body2" color="warning">
          Cancelar suscripcion?
        </Typography>
      </Paper>
    </>
  );
}
