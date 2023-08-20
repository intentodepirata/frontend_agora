import FormLogin from "../components/FormLogin/FormLogin";
import { Box } from "@mui/material";
import useScrollUp from "../hooks/useScrollUp";

import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const { login } = useUserContext();
  const navigate = useNavigate();
  useScrollUp();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      enqueueSnackbar(`Bienvenido ${data.data.nombre} ${data.data.apellidos}`, {
        variant: "success",
      });
      login(data.data);
      navigate("/home");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data, {
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
      <FormLogin loginMutation={loginMutation} />
    </Box>
  );
};

export default Login;
