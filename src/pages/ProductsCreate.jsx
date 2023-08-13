import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormProduct from "../components/FormProduct/FormProduct";
import useScrollUp from "../hooks/useScrollUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../contexts/UserContext";
import { addProduct } from "../api/products";
import { enqueueSnackbar } from "notistack";

const ProductsCreate = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  useScrollUp();

  const createMutation = useMutation({
    mutationFn: (values) => addProduct(values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Producto creado correctamente", {
        variant: "success",
      });
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
            Agregar Producto
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
        <FormProduct createMutation={createMutation} />
      </Box>
    </Box>
  );
};

export default ProductsCreate;
