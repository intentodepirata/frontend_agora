import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormProduct from "../components/FormProduct/FormProduct";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";

const ProductsEdit = () => {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  useScrollUp();

  const { user } = useUserContext();
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}componente/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducto();
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
          <IconButton component={Link} to="/home/products" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Editar Producto
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar producto
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormProduct producto={producto} />
      </Box>
    </Box>
  );
};

export default ProductsEdit;
