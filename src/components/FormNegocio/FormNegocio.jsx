import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useUserContext } from "../../contexts/UserContext";

export default function FormNegocio({
  businessValues,
  setBusinessValues,
  logoData,
  setLogoData,
  deleteImageMutation,
  handleImageUpload,
}) {
  const { user } = useUserContext();
  const handleChange = (e) => {
    setBusinessValues({ ...businessValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Paper elevation={1} sx={{ border: "1px solid #C4C4C4" }}>
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="initial" mb={2}>
            Datos de mi negocio:
          </Typography>
          <Box sx={{ display: "flex" }} mb={2}>
            <TextField
              id="negocio"
              label="Nombre del negocio"
              name="nombre"
              value={businessValues.nombre}
              onChange={handleChange}
              size="small"
              sx={{ mr: 2, width: "50%" }}
            />
            <TextField
              id="telefono"
              label="Telefono"
              name="telefono"
              value={businessValues.telefono}
              onChange={handleChange}
              size="small"
              sx={{ width: "50%" }}
            />
          </Box>
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              id="pais"
              label="Pais"
              name="pais"
              value={businessValues.pais}
              onChange={handleChange}
              size="small"
              sx={{ mr: 2, width: "50%" }}
            />
            <TextField
              id="precio"
              label="Precio/hora"
              name="precioHora"
              value={businessValues.precioHora}
              onChange={handleChange}
              size="small"
              sx={{ width: "50%" }}
            />
          </Box>
          <TextField
            fullWidth
            id="direccion"
            label="Direccion"
            name="direccion"
            value={businessValues.direccion}
            onChange={handleChange}
            multiline
            rows={2}
            variant="filled"
          />
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ border: "1px solid #C4C4C4", mt: 4, p: 4 }}>
        <Typography variant="body1" color="initial" mb={2}>
          Logo:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MuiFileInput
              size="small"
              value={logoData}
              onChange={(imagen) => setLogoData(imagen)}
              placeholder="Imagen Logo"
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleImageUpload}
                disabled={!user.negocio}
              >
                Subir Logo
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteImageMutation.mutate()}
                disabled={!user.negocio}
              >
                Eliminar Logo
              </Button>
            </Stack>
          </Box>
          <Box
            mt={2}
            component={"img"}
            src={businessValues.logo}
            width={"60%"}
            p={10}
            sx={{
              mx: "auto",
            }}
          />
        </Box>
      </Paper>
    </>
  );
}
