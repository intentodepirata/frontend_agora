import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import InventoryIcon from "@mui/icons-material/Inventory";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useUserContext } from "../../contexts/UserContext";
import {
  formattedDate,
  getTotalByEstado,
  initialValues,
  updateHighcharts,
} from "./utils/utils";
const MainWidget = ({
  rows,
  fetchOtsDay,
  fetchOtsWeek,
  fetchOtsMonth,
  setFiltroEstado,
  filtroEstado,
}) => {
  const [options, setOptions] = useState(initialValues);
  const [selectedButton, setSelectedButton] = useState(3);

  const { user } = useUserContext();

  useEffect(() => {
    // Obtener el estado y contar el número de reparaciones en cada estado
    const data = updateHighcharts(rows);
    // Actualizar la serie de la gráfica con los nuevos datos
    setOptions((prevOptions) => ({
      ...prevOptions,
      series: [{ data }],
    }));
  }, [rows]);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const handleFiltrarClick = (estado) => {
    if (filtroEstado === estado) {
      // Si el botón ya está activo, desactivarlo
      setFiltroEstado("");
    } else {
      // Si el botón no está activo, establecer el filtro correspondiente
      setFiltroEstado(estado);
    }
  };
  const isFiltroActivo = (estado) => filtroEstado === estado;
  return (
    <>
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
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 2,
            }}
          >
            <Button
              sx={{
                m: 1,
                p: 4,
                border: isFiltroActivo("Pendiente")
                  ? "1px solid  #0150F5"
                  : "disable",
                width: "100%",
                maxWidth: "300px",
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
              }}
              variant={"disable"}
              color="primary"
              onClick={() => handleFiltrarClick("Pendiente")}
            >
              <PeopleAltIcon
                color="primary"
                sx={{ fontSize: "1.5rem", mr: 1 }}
              />
              {` ${getTotalByEstado(
                "Pendiente de repuesto",
                rows
              )} Pdt. de repuesto`}
            </Button>
            <Button
              sx={{
                m: 1,
                p: 4,
                border: isFiltroActivo("En reparacion")
                  ? "1px solid  #0150F5"
                  : "disable",
                width: "100%",
                maxWidth: "300px",
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
              }}
              variant={"disable"}
              color="primary"
              onClick={() => handleFiltrarClick("En reparacion")}
            >
              <PendingActionsIcon
                color="primary"
                sx={{ fontSize: "1.5rem", mr: 1 }}
              />
              {` ${getTotalByEstado("En reparacion", rows)} En reparacion`}
            </Button>
            <Button
              sx={{
                m: 1,
                p: 4,
                border: isFiltroActivo("Finalizada")
                  ? "1px solid  #0150F5"
                  : "disable",
                width: "100%",
                maxWidth: "300px",
                textTransform: "none",
                fontSize: "1.25rem",
                display: "flex",
                placeContent: "center space-evenly",
                alignItems: "center",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary",
                },
              }}
              variant={"disable"}
              color="primary"
              onClick={() => handleFiltrarClick("Finalizada")}
            >
              <InventoryIcon
                color="primary"
                sx={{ fontSize: "1.5rem", mr: 1 }}
              />
              {` ${getTotalByEstado(
                "Reparacion Finalizada",
                rows
              )}  Finalizada`}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ pt: 2, maxWidth: "600px", width: "50%" }}>
              <HighchartsReact highcharts={Highcharts} options={options} />
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
                }}
              >
                <Box textAlign={"center"}>
                  <Typography variant="h5" color="initial">
                    Facturado
                  </Typography>
                  <Typography variant="h6" color="initial">
                    0.00 €
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
                    fetchOtsDay();
                    handleButtonClick(1);
                  }}
                >
                  Hoy
                </Button>
                <Button
                  variant={selectedButton === 2 ? "contained" : "outlined"}
                  sx={{
                    borderRadius: "0",
                    borderLeft: 0,
                    textTransform: "none",
                    bg: "primary",
                    boxShadow: 0,
                    color: selectedButton === 2 ? "white" : "primary",
                    py: 0.5,
                    px: 3,
                  }}
                  onClick={() => {
                    fetchOtsWeek();
                    handleButtonClick(2);
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
                    boxShadow: 0,
                    py: 0.5,
                    px: 3,
                    color: selectedButton === 3 ? "white" : "primary",
                  }}
                  onClick={() => {
                    fetchOtsMonth(), handleButtonClick(3);
                  }}
                >
                  Mes
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainWidget;
