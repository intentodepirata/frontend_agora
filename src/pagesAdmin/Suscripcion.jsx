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
          mt: 2,
          mb: 3,
        }}
      >
        <Typography component="h1" variant="h6" color="initial">
          Mi suscripcion
        </Typography>
      </Box>

      <FormSuscripcion />
    </>
  );
};

export default Suscripcion;
