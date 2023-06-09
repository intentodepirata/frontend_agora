import { Box, Paper, Typography, Button } from "@mui/material";

import TablaClients from "../components/TablaClients/TablaClients";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Clients = () => {
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}cliente/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        setRows(data);
      } catch (error) {
        console.error("Error al obtener las ots:", error);
      }
    };
    fetchClientes();
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
          Clientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/clients/create"
        >
          Crear cliente
        </Button>
      </Box>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaClients rows={rows} />
      </Box>
    </>
  );
};

export default Clients;
