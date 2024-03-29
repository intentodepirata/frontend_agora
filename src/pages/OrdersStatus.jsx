import { Box, Divider, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import useScrollUp from "../hooks/useScrollUp";
import { useUserContext } from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { findOrderStatus } from "../api/orders";

export default function OrdersStatus() {
  const { user } = useUserContext();
  const { id } = useParams();
  useScrollUp();

  const queryParams = new URLSearchParams(location.search);
  const logo = queryParams.get("logo");

  // console.log(logo);
  const { data: order } = useQuery({
    queryKey: ["status-order", id],
    queryFn: () => findOrderStatus(id),
    onError: (error) => {
      console.error(error.message);
    },
  });

  const { precio, imei, estado, tipoGarantia, fechaModificacion } =
    order?.data || {};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
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
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr) ",
                },
                p: 1,
              }}
            >
              <Box
                component={"img"}
                src={user?.negocio.logo ? user?.negocio.logo : logo}
                maxWidth="150px"
                width={"100%"}
                alt="logo"
              />
              <Typography
                sx={{ textAlign: { xs: "center" } }}
                fontWeight={"bold"}
                variant="subtitle1"
                color="grey"
              >
                {user?.negocio.nombre
                  ? user?.negocio.nombre
                  : "Agora TechSolutions"}
              </Typography>
              <Box
                textAlign={"right"}
                sx={{
                  gridRow: { xs: "1", sm: "1" },
                  gridColumn: { xs: "2", sm: "3" },
                }}
              >
                <Typography fontWeight={"bold"} variant="h6" color="primary">
                  {order?.id && `OT00${order?.id}`}
                </Typography>
                <Typography variant="subtitle2" color="grey">
                  {fechaModificacion}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(3, 1fr) ",
                },
                p: 1,
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
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
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
