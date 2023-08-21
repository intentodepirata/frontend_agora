import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormClientes from "../components/FormClientes/FormClientes";
import useScrollUp from "../hooks/useScrollUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomer } from "../api/customers";
import { useUserContext } from "../contexts/UserContext";
import { enqueueSnackbar } from "notistack";

const ClientsCreate = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  useScrollUp();

  const createCustomerMutation = useMutation({
    mutationFn: (values) => addCustomer(values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Cliente creado correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["customers"]);
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
            Agregar Cliente
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar cliente
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormClientes createCustomerMutation={createCustomerMutation} />
      </Box>
    </Box>
  );
};

export default ClientsCreate;
