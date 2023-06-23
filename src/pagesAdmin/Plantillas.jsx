import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormPlantillas from "../components/FormPlantillas/FormPlantillas";
import TablaChecklist from "../components/TablaChecklist/TablaChecklist";

const Plantillas = () => {
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
          Politicas y plantillas
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
        Formulario de politicas y plantillas
      </Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormPlantillas />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mt: 3,
        }}
      >
        <Typography component="h1" variant="h6" color="initial" sx={{ p: 2 }}>
          Checklist de revision
        </Typography>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey"></Typography>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaChecklist />
      </Box>
    </>
  );
};

export default Plantillas;
