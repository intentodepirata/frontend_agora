import { Box, Typography, Button } from "@mui/material";
import TablaOrders from "../components/TablaOrders/TablaOrders";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { user } = useUserContext();
  useScrollUp();

  useEffect(() => {
    const fetchOts = async () => {
      try {
        setCargando(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}ot/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        setRows(data);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener las ots:", error);
      }
    };
    fetchOts();
  }, []);
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
          Ordenes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/orders/create"
        >
          Crear orden
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Historial de reparaciones
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaOrders rows={rows} cargando={cargando} />
      </Box>
    </>
  );
};

export default Orders;
