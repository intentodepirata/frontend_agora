import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormProduct from "../components/FormProduct/FormProduct";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";
import { findProduct, updateProduct } from "../api/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const ProductsEdit = () => {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useScrollUp();

  useQuery({
    queryKey: ["product"],
    queryFn: () => findProduct(id, user.token),
    onSuccess: (data) => setProducto(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values) => updateProduct(id, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Producto actualizado correctamente", {
        variant: "success",
      });
      navigate("/home/products");
      queryClient.invalidateQueries(["products"]);
    },
  });

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
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormProduct producto={producto} updateMutation={updateMutation} />
      </Box>
    </Box>
  );
};

export default ProductsEdit;
