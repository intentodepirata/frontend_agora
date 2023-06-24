import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormInvitar from "../components/FormInvitar/FormInvitar";
import useScrollUp from "../hooks/useScrollUp";

const Permisos = () => {
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

      <FormInvitar />
    </>
  );
};

export default Permisos;
