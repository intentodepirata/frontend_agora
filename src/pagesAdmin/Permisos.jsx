import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormInvitar from "../components/FormInvitar/FormInvitar";

const Permisos = () => {
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
          Usuarios y permisos
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
        Formulario de usuarios y permisos
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormInvitar />
      </Box>
    </>
  );
};

export default Permisos;
