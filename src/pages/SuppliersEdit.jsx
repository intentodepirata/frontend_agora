import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserContext } from "../contexts/UserContext";
import FormProveedores from "../components/FormProveedores/FormProveedores";
import useScrollUp from "../hooks/useScrollUp";
import { findSupplier, updateSupplier } from "../api/suppliers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const SuppliersEdit = () => {
  const [proveedor, setProveedor] = useState({});
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useScrollUp();

  useQuery({
    queryKey: ["supplier"],
    queryFn: () => findSupplier(id, user.token),

    onSuccess: (data) => setProveedor(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values) => updateSupplier(id, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Proveedor actualizado correctamente", {
        variant: "success",
      });
      navigate("/home/suppliers");
      queryClient.invalidateQueries(["supplier"]);
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
            Editar Proveedor
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormProveedores
          proveedor={proveedor}
          updateMutation={updateMutation}
        />
      </Box>
    </Box>
  );
};

export default SuppliersEdit;
