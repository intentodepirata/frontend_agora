import { Box, Typography, Button } from "@mui/material";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import InventoryIcon from "@mui/icons-material/Inventory";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useUserContext } from "../../contexts/UserContext";
const MainWidget = () => {
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Estado de reparaciones",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },

    series: [
      {
        data: [
          {
            name: "En proceso",
            y: 33.3,
            color: "#0150F5",
          },
          {
            name: "Por entregar",
            y: 33.3,
            color: "#2ecc71",
          },
          {
            name: "En revisión",
            y: 33.3,
            color: "#f1c40f",
          },
        ],
      },
    ],
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const { user } = useUserContext();
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
              // onClick={handleOrdenesClick}
            >
              <PeopleAltIcon
                color="primary"
                sx={{ fontSize: "1.5rem", mr: 1 }}
              />
              1 Por Asignar
            </Button>
            <Button
              sx={{
                m: 1,
                p: 4,
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
              // onClick={handleOrdenesClick}
            >
              <PendingActionsIcon
                color="primary"
                sx={{ fontSize: "1.5rem", mr: 1 }}
              />
              1 En Proceso
            </Button>
            <Button
              sx={{
                m: 1,
                p: 4,
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
              // onClick={handleOrdenesClick}
            >
              <InventoryIcon
                color="primary"
                sx={{ fontSize: "1.5rem", mr: 1 }}
              />
              1 Por Entregar
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
                    Ventas
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
                    1
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
                  // onClick={handleShowMensual}
                  variant={"contained"}
                  color="primary"
                  sx={{
                    borderRadius: "4px 0 0 4px",
                    textTransform: "none",
                    bg: "primary",
                    boxShadow: 0,
                    border: "2px solid #0150F5",
                    py: 0.5,
                    px: 3,
                  }}
                >
                  Hoy
                </Button>
                <Button
                  // onClick={handleShowAnual}
                  variant={"outlined"}
                  color="primary"
                  sx={{
                    color: "black",
                    borderRadius: "0",
                    textTransform: "none",
                    bg: "primary",
                    boxShadow: 0,
                    border: "2px solid #0150F5",
                    py: 0.5,
                    px: 3,
                  }}
                >
                  Semana
                </Button>
                <Button
                  // onClick={handleShowAnual}
                  variant={"outlined"}
                  color="primary"
                  sx={{
                    color: "black",
                    borderRadius: "0 4px 4px 0",
                    textTransform: "none",
                    bg: "primary",
                    boxShadow: 0,
                    border: "2px solid #0150F5",
                    py: 0.5,
                    px: 3,
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
