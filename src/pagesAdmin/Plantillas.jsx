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
import useScrollUp from "../hooks/useScrollUp";

const Plantillas = () => {
  useScrollUp();
  const { user } = useUserContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 2,
          py: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial">
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

      <FormPlantillas />

      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mt: 2,
        }}
      > */}
      <Typography mt={2} component="h1" variant="h6" color="initial">
        Checklist de revision
      </Typography>
      {/* </Box> */}
      <Typography textAlign={"center"} variant="h6" color="grey"></Typography>

      <TablaChecklist />
    </>
  );
};

export default Plantillas;
