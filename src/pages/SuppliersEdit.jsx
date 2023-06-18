import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useUserContext } from "../contexts/UserContext";
import FormProveedores from "../components/FormProveedores/FormProveedores";

const SuppliersEdit = () => {
  const [proveedor, setProveedor] = useState({});
  const { id } = useParams();

  const { user } = useUserContext();
  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}proveedores/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();
        setProveedor(data);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };
    fetchProveedor();
  }, []);
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
          <IconButton component={Link} to="/home/suppliers" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Editar Proveedor
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Actualizar proveedor
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormProveedores proveedor={proveedor} />
      </Box>
    </Box>
  );
};

export default SuppliersEdit;
