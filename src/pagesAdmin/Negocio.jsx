import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormNegocio from "../components/FormNegocio/FormNegocio";
import useScrollUp from "../hooks/useScrollUp";

const Negocio = () => {
  const { user } = useUserContext();
  useScrollUp();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
          my: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial">
          Mi negocio
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar
        </Button>
      </Box>
      <FormNegocio />
    </>
  );
};

export default Negocio;
