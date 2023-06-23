import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import logo from "../assets/img/logo-trans.png";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import useScrollUp from "../hooks/useScrollUp";

export default function OrdersStatus() {
  const [order, setOrder] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  useScrollUp();
  useEffect(() => {
    const statusFetch = async () => {
      try {
        setCargando(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}ot/status/${id}`
        );

        const data = await response.json();

        setOrder(data);

        console.log(data);

        setCargando(false);
      } catch (error) {
        console.error("Error al obtener la Orden:", error);
      }
    };
    statusFetch();
  }, [id]);

  const {
    precio,
    imei,
    estado,
    tipoGarantia,
    fechaEntrada,
    fechaModificacion,
    averiaDetectadaSat,
  } = order || {};
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          backgroundImage: "url('/img/background-landpage.svg')",
          backgroundColor: "#F3F4F6",
          backgroundPosition: "100%",
          backgroundSize: "cover",
          backgroundOrigin: "content-box",
        }}
      >
        <Paper
          sx={{
            maxWidth: "600px",
            p: 2,
            width: "100%",
            boxShadow: "-3px 22px 58px -3px rgba(0, 0, 0, 0.53)",
            WebkitBoxShadow: "-3px 22px 58px -3px rgba(0, 0, 0, 0.53)",
            MozBoxShadow: "-3px 22px 58px -3px rgba(0, 0, 0, 0.53)",
          }}
        >
          <Box sx={{ p: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                alignItems: "flex-start",
              }}
            >
              <Box
                component={"img"}
                src={logo}
                maxWidth="120px"
                width={"100%"}
                alt="logo"
              />
              <Typography fontWeight={"bold"} variant="h5" color="grey">
                Reparaciones Lucatoni
              </Typography>
              <Box textAlign={"right"}>
                <Typography fontWeight={"bold"} variant="h6" color="primary">
                  OT 000{id}
                </Typography>
                <Typography variant="subtitle2" color="grey">
                  {fechaModificacion}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box>
                <Typography fontWeight={"bold"} variant="body2" color="initial">
                  Estado:
                </Typography>
                <Typography variant="body1" color="grey ">
                  {estado}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={"bold"} variant="body2" color="initial">
                  IMEI:
                </Typography>
                <Typography variant="body1" color="grey ">
                  {imei}
                </Typography>
              </Box>
              <Box textAlign={"right"}>
                <Typography fontWeight={"bold"} variant="body2" color="initial">
                  Resolucion:
                </Typography>
                <Typography variant="body1" color="grey ">
                  {tipoGarantia}: {precio}€
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}
