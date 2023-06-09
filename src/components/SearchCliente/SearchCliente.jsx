import { Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const SearchCliente = () => {
  const [clienteSearch, setClienteSearch] = useState("");
  return (
    <Paper
      elevation={4}
      sx={{ p: 2, maxWidth: "400px", display: "flex", alignItems: "center" }}
    >
      <Typography
        variant="body1"
        color="grey"
        fontWeight={"bold"}
        sx={{ mr: 2 }}
      >
        Buscar Cliente
      </Typography>
      <TextField
        size="small"
        id="searchCliente"
        label="nombre, dni, telefono..."
        value={clienteSearch}
        onChange={(e) => setClienteSearch(e.target.value)}
      />
    </Paper>
  );
};

export default SearchCliente;
