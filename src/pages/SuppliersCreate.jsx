import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormProduct from "../components/FormProduct/FormProduct";
import FormProveedores from "../components/FormProveedores/FormProveedores";
import useScrollUp from "../hooks/useScrollUp";

const SuppliersCreate = () => {
  useScrollUp();
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
            Agregar proveedor
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar proveedor
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormProveedores />
      </Box>
    </Box>
  );
};

export default SuppliersCreate;
