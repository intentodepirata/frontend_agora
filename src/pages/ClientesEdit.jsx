import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserContext } from "../contexts/UserContext";
import FormClientes from "../components/FormClientes/FormClientes";
import useScrollUp from "../hooks/useScrollUp";

const ClientesEdit = () => {
  const [cliente, setCliente] = useState(null);
  const { id } = useParams();
  useScrollUp();
  const { user } = useUserContext();
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}cliente/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const [data] = await response.json();

        setCliente(data);
      } catch (error) {
        console.error("Error al obtener los Clientes:", error);
      }
    };
    fetchCliente();
  }, [id]);
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/home/clientes" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Editar Cliente
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar Cliente
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormClientes cliente={cliente} />
      </Box>
    </Box>
  );
};

export default ClientesEdit;
