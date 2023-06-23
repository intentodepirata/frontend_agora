import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormSuscripcion from "../components/FormSuscripcion/FormSuscripcion";
import useScrollUp from "../hooks/useScrollUp";

const Suscripcion = () => {
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
          Mi suscripcion
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar
        </Button>
      </Box>

      <FormSuscripcion />
    </>
  );
};

export default Suscripcion;
