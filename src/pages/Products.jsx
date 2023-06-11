import { Box, Paper, Typography, Button } from "@mui/material";
import TablaProducts from "../components/TablaProducts/TablaProducts";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";

const Products = () => {
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();

  const fetchComponentes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}componente/`,
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

  useEffect(() => {
    fetchComponentes();
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
          Inventario
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/products/create"
        >
          Agregar producto
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaProducts rows={rows} fetchComponentes={fetchComponentes} />
      </Box>
    </>
  );
};

export default Products;
