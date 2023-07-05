import { Box, Button, Typography } from "@mui/material";

export default function NoAuth() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" color="grey">
        No tiene permisos para acceder a esta vista
      </Typography>
      <Button variant="contained" onClick={handleGoBack}>
        Volver
      </Button>
    </Box>
  );
}
