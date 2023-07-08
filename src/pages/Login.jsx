import React from "react";
import FormLogin from "../components/FormLogin/FormLogin";
import { Box } from "@mui/material";
import useScrollUp from "../hooks/useScrollUp";

const Login = () => {
  useScrollUp();
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
      <FormLogin />
    </Box>
  );
};

export default Login;
