import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";

const Centros = () => {
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
          Centros de trabajo
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
        Formulario de centros de trabajo
      </Typography>
    </>
  );
};

export default Centros;
