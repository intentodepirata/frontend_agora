import { Box, Button, Typography } from "@mui/material";
import GraficaGastos from "../components/GraficaGastos/GraficaGastos";
import GraficaAverias from "../components/GraficaAverias/GraficaAverias";
import useScrollUp from "../hooks/useScrollUp";
import FormEstadisticas from "../components/FormEstadisticas/FormEstadisticas";
import { addDays } from "date-fns";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import GraficaGastosMaxMin from "../components/GraficaGastosMaxMin/GraficaGastosMaxMin";
import GraficaTat from "../components/GraficaTat/GraficaTat";
import { enqueueSnackbar } from "notistack";
export default function Stats() {
  const [gastosIngresos, setGastosIngresos] = useState(null);
  const [averias, setAverias] = useState(null);
  const [tat, setTat] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [rangeDates, setRangeDates] = useState([
    {
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1
      ),
      endDate: addDays(
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0),
        30
      ),
      key: "selection",
    },
  ]);
  const { user } = useUserContext();

  useScrollUp();

  const fetchStats = async (rangeDates) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}estadisticas`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(rangeDates),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setGastosIngresos(data.gastosIngresos);
      setAverias(data.averias);
      setTat(data.tatFinalizadas);
    } catch (error) {
      enqueueSnackbar("No hay reapraciones en esa fecha", {
        variant: "info",
      });
      console.error("Error al obtener las estadisticas", error);
    }
  };

  const handleShowStats = () => {
    setShowStats(true);
    fetchStats(rangeDates);
  };
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ mb: 5, textAlign: "center" }}
          fontWeight={"bold"}
          variant="h4"
          color="grey.500"
        >
          Selecciona un rango de fechas
        </Typography>
        <FormEstadisticas
          setRangeDates={setRangeDates}
          rangeDates={rangeDates}
        />

        <Button
          variant="contained"
          sx={{ bgcolor: "#3D91FF" }}
          onClick={() => handleShowStats()}
        >
          Ver estadisticas
        </Button>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showStats && (
          <>
            <Typography
              sx={{ my: 5, textAlign: "center" }}
              fontWeight={"bold"}
              variant="h4"
              color="grey.500"
            >
              Estadísticas económicas
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <GraficaGastos data={gastosIngresos} />
              <GraficaGastosMaxMin data={gastosIngresos} />
            </Box>
            <Typography
              sx={{ my: 5, textAlign: "center" }}
              fontWeight={"bold"}
              variant="h4"
              color="grey.500"
            >
              Estadísticas SAT
            </Typography>
            <Box
              sx={{
                mt: 2,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <GraficaAverias data={averias} />
              <GraficaTat data={tat} />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
