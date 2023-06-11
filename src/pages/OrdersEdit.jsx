import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
const OrdersEdit = () => {
  const [fetchData, setFetchData] = useState(false);

  const handleButtonClick = () => {
    setFetchData(true);
  };
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/home" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Editar Orden
          </Typography>
        </Box>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Guardar Orden
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormOperacionesTecnicas
          fetchData={fetchData}
          setFetchData={setFetchData}
        />
      </Box>
    </Box>
  );
};

export default OrdersEdit;
