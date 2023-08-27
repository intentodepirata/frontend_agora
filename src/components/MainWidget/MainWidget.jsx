import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useUserContext } from "../../contexts/UserContext";
import {
  formattedDate,
  getTotalByEstado,
  initialValues,
  obtenerRolUsuario,
  updateHighcharts,
} from "./utils/utils";
import accessibility from "highcharts/modules/accessibility";
import { STATES, TIME } from "./utils/constantes";
import { customButton } from "./styles/customButton";

const MainWidget = ({
  rows,
  setTime,
  setFiltroEstado,
  filtroEstado,
  totalFacturado,
}) => {
  const [options, setOptions] = useState(initialValues);
  const [selectedButton, setSelectedButton] = useState(3);
  const [chartKey, setChartKey] = useState(0);
  const { user } = useUserContext();

  accessibility(Highcharts);

  useEffect(() => {
    const data = updateHighcharts(rows);
    setOptions((prevOptions) => ({
      ...prevOptions,
      series: [{ data }],
    }));

    setChartKey((prevKey) => prevKey + 1);
  }, [rows]);

  const handleButtonClick = (buttonId, time) => {
    setSelectedButton(buttonId);
    setTime(time);
  };

  const handleFiltrarClick = (estado) => {
    if (filtroEstado === estado) {
      setFiltroEstado("");
    } else {
      setFiltroEstado(estado);
    }
  };
  const isFiltroActivo = (estado) => filtroEstado === estado;

  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 2 }}>
        <Typography textAlign={"center"} variant="h5" color="inherit">
          {formattedDate}
        </Typography>
        <Typography textAlign={"center"} variant="h5" color="initial">
          Saludos, {user?.nombre} {user?.apellidos}
          <Box ml={1} component={"span"} sx={{ color: "#0150F5" }}>
            {obtenerRolUsuario(user?.role)}
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
            gap: 1,
          }}
        >
          <Button
            sx={customButton(isFiltroActivo(STATES.PENDIENTE))}
            onClick={() => handleFiltrarClick(STATES.PENDIENTE)}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: "1.8rem", mr: 1 }}
              color="primary"
            />
            {` ${getTotalByEstado(
              "Pendiente de repuesto",
              rows
            )} Pdt. de repuesto`}
          </Button>
          <Button
            sx={customButton(isFiltroActivo(STATES.EN_REPARACION))}
            onClick={() => handleFiltrarClick(STATES.EN_REPARACION)}
          >
            <ManageHistoryIcon
              sx={{ fontSize: "1.8rem", mr: 1 }}
              color="primary"
            />
            {` ${getTotalByEstado(STATES.EN_REPARACION, rows)} En reparación`}
          </Button>
          <Button
            sx={customButton(isFiltroActivo(STATES.FINALIZADA))}
            onClick={() => handleFiltrarClick(STATES.FINALIZADA)}
          >
            <CheckCircleOutlineRoundedIcon
              sx={{ fontSize: "1.8rem", mr: 1 }}
              color="primary"
            />
            {` ${getTotalByEstado("Reparacion Finalizada", rows)}  Finalizadas`}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ pt: 2, maxWidth: "600px", width: { xs: "100%", md: "50%" } }}
          >
            <HighchartsReact
              key={chartKey}
              highcharts={Highcharts}
              options={options}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "600px",
              width: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <Box textAlign={"center"}>
                <Typography variant="h5" color="initial">
                  Facturado
                </Typography>
                <Typography variant="h6" color="initial">
                  {totalFacturado ? totalFacturado : 0}€
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <Typography variant="h5" color="initial">
                  Finalizadas
                </Typography>
                <Typography variant="h6" color="initial">
                  {` ${getTotalByEstado("Reparacion Finalizada", rows)}`}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mb: 2,
                mt: 1.5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant={selectedButton === 1 ? "contained" : "outlined"}
                sx={{
                  borderRadius: "4px 0 0 4px",
                  borderRight: 0,
                  textTransform: "none",
                  bg: "primary",
                  boxShadow: 0,
                  py: 0.5,
                  px: 3,
                  color: selectedButton === 1 ? "white" : "primary",
                }}
                onClick={() => {
                  handleButtonClick(1, TIME.DIA);
                }}
              >
                Hoy
              </Button>
              <Button
                variant={selectedButton === 2 ? "contained" : "outlined"}
                sx={{
                  borderRadius: "0",
                  borderLeft: 0,
                  borderRight: 0,
                  textTransform: "none",
                  bg: "primary",
                  boxShadow: 0,
                  color: selectedButton === 2 ? "white" : "primary",
                  py: 0.5,
                  px: 3,
                }}
                onClick={() => {
                  handleButtonClick(2, TIME.SEMANA);
                }}
              >
                Semana
              </Button>
              <Button
                variant={selectedButton === 3 ? "contained" : "outlined"}
                sx={{
                  borderRadius: "0 4px 4px 0",
                  textTransform: "none",
                  bg: "primary",
                  borderLeft: 0,
                  boxShadow: 0,
                  py: 0.5,
                  px: 3,
                  color: selectedButton === 3 ? "white" : "primary",
                }}
                onClick={() => {
                  handleButtonClick(3, TIME.MES);
                }}
              >
                Mes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainWidget;
