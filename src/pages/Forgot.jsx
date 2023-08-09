import { Box } from "@mui/material";
import FormForgot from "../components/FormForgot/FormForgot";
import useScrollUp from "../hooks/useScrollUp";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { forgotPassword } from "../api/users";

const Forgot = () => {
  const navigate = useNavigate();
  useScrollUp();

  const createMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      enqueueSnackbar(" Instrucciones enviadas, revise su bandeja de entrada", {
        variant: "success",
      });
      navigate("/login");
    },
    onError: (error) => {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    },
  });

  return (
    <Box
      component="main"
      sx={{
        margin: "0 auto",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "960px",
          lg: "1280px",
          xl: "1440px",
          xxl: "1920px",
          xxxl: "2560px",
        },
        p: 2,
      }}
    >
      <FormForgot createMutation={createMutation} />
    </Box>
  );
};

export default Forgot;
