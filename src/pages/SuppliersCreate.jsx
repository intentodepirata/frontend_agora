import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormProveedores from "../components/FormProveedores/FormProveedores";
import useScrollUp from "../hooks/useScrollUp";
import { useUserContext } from "../contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSupplier } from "../api/suppliers";
import { enqueueSnackbar } from "notistack";

const SuppliersCreate = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  useScrollUp();

  const createMutation = useMutation({
    mutationFn: (values) => addSupplier(values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Proveedor creado correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["suppliers"]);
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
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormProveedores createMutation={createMutation} />
      </Box>
    </Box>
  );
};

export default SuppliersCreate;
