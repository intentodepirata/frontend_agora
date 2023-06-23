import { Box, Typography } from "@mui/material";
import TablaServicios from "../components/TablaServicios/TablaServicios";

export default function Services() {
  const rows = [];
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
          Servicios
        </Typography>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Listado de servicios
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaServicios rows={rows} />
      </Box>
    </>
  );
}
