import { Box } from "@mui/material";
import FormForgot from "../components/FormResetPassword/FormResetPassword";
import useScrollUp from "../hooks/useScrollUp";
import { resetPassword } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const ResetPassword = () => {
  const { token } = useParams();
  const decodedToken = decodeURIComponent(token);
  const navigate = useNavigate();
  useScrollUp();

  const resetPasswordMutation = useMutation({
    mutationFn: (values) => resetPassword(decodedToken, values),
    onSuccess: () => {
      enqueueSnackbar("Contraseña restablecida");
      navigate("/login");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data, {
        variant: "error",
      });
      console.log(error);
    },
  });

  return (
    <Box component="main" sx={{ margin: "0 auto", maxWidth: "1200px", p: 2 }}>
      <FormForgot resetPasswordMutation={resetPasswordMutation} />
    </Box>
  );
};

export default ResetPassword;
