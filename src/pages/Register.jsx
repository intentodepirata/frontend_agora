import { Box } from "@mui/material";
import FormRegister from "../components/FormRegister/FormRegister";
import useScrollUp from "../hooks/useScrollUp";
import { enqueueSnackbar } from "notistack";
import { addUser } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  useScrollUp();

  const createUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      enqueueSnackbar(
        `Usuario registrado con exito, Se ha enviado un email de 
        confirmacion a su bandeja de entrada`,
        { variant: "success", persist: true }
      );
      navigate("/login");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.error, {
        variant: "error",
      });
    },
  });
  return (
    <Box component="main" sx={{ margin: "0 auto", maxWidth: "1200px", p: 2 }}>
      <FormRegister createUserMutation={createUserMutation} />
    </Box>
  );
};

export default Register;
