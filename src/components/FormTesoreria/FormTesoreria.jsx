import { Box, Button, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
export default function FormTesoreria({
  setTotalGastos,
  setTotalIngresos,
  cajaCerrada,
}) {
  const [gasto, setGasto] = useState(0);
  const [ingreso, setIngreso] = useState(0);

  const handleGasto = (e) => {
    e.preventDefault();
    setTotalGastos((values) => [gasto, ...values]);

    enqueueSnackbar("Gasto agregado", { variant: "success" });
    setGasto("");
  };
  const handleIngreso = (e) => {
    e.preventDefault();
    setTotalIngresos((values) => [ingreso, ...values]);

    enqueueSnackbar("Ingreso agregado", { variant: "success" });
    setIngreso("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Paper
        component={"form"}
        onSubmit={handleGasto}
        elevation={1}
        sx={{
          p: 4,
          width: "100%",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={"bold"} variant="h6" color="primary" pb={1}>
          Gastos
        </Typography>
        <Typography variant="body1" color="initial" pb={2}>
          Agrega un nuevo gasto
        </Typography>
        <TextField
          id="NuevoGasto"
          label="Nuevo Gasto"
          value={gasto}
          onChange={(e) => setGasto(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
          disabled={cajaCerrada}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={cajaCerrada}
        >
          Agregar
        </Button>
      </Paper>
      <Paper
        component={"form"}
        onSubmit={handleIngreso}
        elevation={1}
        sx={{
          p: 4,
          width: "100%",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={"bold"} variant="h6" color="primary" pb={1}>
          Ingresos
        </Typography>
        <Typography variant="body1" color="initial" pb={2}>
          Agrega un nuevo ingreso
        </Typography>
        <TextField
          id="NuevoIngreso"
          label="Nuevo ingreso"
          value={ingreso}
          onChange={(e) => setIngreso(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
          disabled={cajaCerrada}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={cajaCerrada}
        >
          Agregar
        </Button>
      </Paper>
    </Box>
  );
}
