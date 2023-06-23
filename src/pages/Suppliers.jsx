import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import TablaProveedores from "../components/TablaProveedores/TablaProveedores";

export default function Suppliers() {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { user } = useUserContext();

  const fetchProveedores = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}proveedores/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      setCargando(false);
      setRows(data);
    } catch (error) {
      "Error al obtener los proveedores:", error;
    }
  };
  useEffect(() => {
    fetchProveedores();
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
          Proveedores
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/suppliers/create"
        >
          Agregar proveedor
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Listado de proveedores
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaProveedores
          rows={rows}
          cargando={cargando}
          fetchProveedores={fetchProveedores}
        />
      </Box>
    </>
  );
}
