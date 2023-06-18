import { Box, Typography } from "@mui/material";
import GraficaGastos from "../components/GraficaGastos/GraficaGastos";
import GraficaAverias from "../components/GraficaAverias/GraficaAverias";
import TablaGastos from "../components/TablaGastos/TablaGastos";

export default function Stats() {
  const rows = [];
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
          Estadisticas
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <GraficaGastos />
        <GraficaAverias />
      </Box>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaGastos rows={rows} />
      </Box>
    </>
  );
}
