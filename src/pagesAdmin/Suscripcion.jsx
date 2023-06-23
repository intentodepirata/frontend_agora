import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormSuscripcion from "../components/FormSuscripcion/FormSuscripcion";

const Suscripcion = () => {
  const { user } = useUserContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial" sx={{ p: 2 }}>
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
      <Typography textAlign={"center"} variant="h6" color="grey">
        Formulario de gestion de suscripcion
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormSuscripcion />
      </Box>
    </>
  );
};

export default Suscripcion;
