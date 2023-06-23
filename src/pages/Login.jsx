import React from "react";
import FormLogin from "../components/FormLogin/FormLogin";
import { Box } from "@mui/material";
import useScrollUp from "../hooks/useScrollUp";

const Login = () => {
  useScrollUp();
  return (
    <Box component="main" sx={{ margin: "0 auto", maxWidth: "1200px", p: 2 }}>
      <FormLogin />
    </Box>
  );
};

export default Login;
