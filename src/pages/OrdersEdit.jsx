import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const OrdersEdit = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <Box>
        <IconButton aria-label="Back">
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="initial"
          sx={{ ml: 2, p: 2 }}
        >
          Orden de trabajo
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", fontSize: "16px" }}
      >
        Guardar
      </Button>
      <Button
        variant="contained"
        color="succes"
        sx={{ textTransform: "none", fontSize: "16px" }}
      >
        Imprimir
      </Button>
      <Button
        variant="contained"
        color="warning"
        sx={{ textTransform: "none", fontSize: "16px" }}
      >
        editar
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: "none", fontSize: "16px" }}
      >
        Eliminar
      </Button>
    </Box>
  );
};

export default OrdersEdit;
