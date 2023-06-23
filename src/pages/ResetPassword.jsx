import React from "react";
import { Box } from "@mui/material";
import FormForgot from "../components/FormResetPassword/FormResetPassword";
import useScrollUp from "../hooks/useScrollUp";

const ResetPassword = () => {
  useScrollUp();
  return (
    <Box component="main" sx={{ margin: "0 auto", maxWidth: "1200px", p: 2 }}>
      <FormForgot />
    </Box>
  );
};

export default ResetPassword;
