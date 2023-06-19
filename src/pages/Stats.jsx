import { Box, Typography } from "@mui/material";
import GraficaGastos from "../components/GraficaGastos/GraficaGastos";
import GraficaAverias from "../components/GraficaAverias/GraficaAverias";
import TablaGastos from "../components/TablaGastos/TablaGastos";
import { rows as rowsGastos } from "../components/TablaGastos/utils/columnas";
import TablaTop5 from "../components/TablaTop5/TablaTop5";
import { rows, rows2 } from "../components/TablaTop5/utils/columnas";
import { GridToolbar } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function Stats() {
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
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box textAlign={"center"}>
          <Typography fontWeight={"bold"} variant="h6" color="grey">
            Tabla de Resultados
          </Typography>
          <ArrowDropDownIcon />
          <TablaGastos rows={rowsGastos} />
        </Box>
        <Box textAlign={"center"}>
          <Typography fontWeight={"bold"} variant="h6" color="grey">
            Tabla de Reparaciones
          </Typography>
          <ArrowDropDownIcon />
          <TablaTop5
            rows={rows2}
            groupBy={["modelo"]}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Box>
    </>
  );
}
