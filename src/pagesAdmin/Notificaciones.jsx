import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";

const Notificaciones = () => {
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
          Mis notificaciones
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
        Mensajes recibidos
      </Typography>
    </>
  );
};

export default Notificaciones;
