import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserContext } from "../contexts/UserContext";
import FormClientes from "../components/FormClientes/FormClientes";
import useScrollUp from "../hooks/useScrollUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findCustomer, updateCustomer } from "../api/clientes";
import { enqueueSnackbar } from "notistack";

const ClientesEdit = () => {
  const [cliente, setCliente] = useState(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useScrollUp();

  useQuery({
    queryKey: ["customer"],
    queryFn: () => findCustomer(id, user.token),

    onSuccess: (data) => setCliente(...data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: (values) => updateCustomer(id, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Cliente actualizado correctamente", {
        variant: "success",
      });
      navigate("/home/clientes");
      queryClient.invalidateQueries(["customer"]);
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
          <IconButton component={Link} to="/home/clientes" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Editar Cliente
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormClientes
          cliente={cliente}
          updateCustomerMutation={updateCustomerMutation}
        />
      </Box>
    </Box>
  );
};

export default ClientesEdit;
