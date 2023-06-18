import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FormDispositivoSchema } from "./FormDispositivoSchema";
import { initialValues } from "./utils/initialValues";
import { useUserContext } from "../../contexts/UserContext";

const FormDispositivo = ({ setDispositivo_id }) => {
  const [imeiSearch, setImeiSearch] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [guardado, setGuardado] = useState(false);
  const { user } = useUserContext();
  const {
    isSubmitting,
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: FormDispositivoSchema,
    onSubmit: async function (values, actions) {
      try {
        const token = user.token;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}dispositivo/`,
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data);
          throw new Error(data.error);
        }
        alert("dispositivo guardado");
        setDispositivo_id(data);
        setGuardado(true);
      } catch (error) {
        alert(error.message);
        actions.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}marca/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };
    fetchMarcas();
  }, []);

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}marca/modelo/${values.marca}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();
        setModelos(data);
      } catch (error) {
        console.error("Error al obtener los Modelos:", error);
      }
    };

    if (values.marca !== "") {
      fetchModelos();
    }
  }, [values.marca]);

  return (
    <Paper
      elevation={4}
      onSubmit={handleSubmit}
      component="form"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        maxWidth: "1308px",
        margin: "auto",
      }}
    >
      <Typography
        sx={{ textAlign: "left", mb: 1 }}
        fontWeight={"bold"}
        variant="h6"
        color={guardado ? "primary" : "grey"}
      >
        Datos Dispositivo
      </Typography>
      <Typography variant="body1" color="grey" mb={2}>
        Rellene todos los campos para agregar un dispositivo
      </Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          size="small"
          name="imei"
          label="IMEI"
          disabled={guardado}
          value={values.imei}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.imei && Boolean(errors.imei)}
          helperText={touched.imei && errors.imei}
          sx={{ mr: 2, width: "33%" }}
        />

        <FormControl
          size="small"
          disabled={guardado}
          error={touched.marca && Boolean(errors.marca)}
          sx={{ mr: 2, width: "33%" }}
        >
          <InputLabel htmlFor="marca">Marca del dispositivo</InputLabel>
          <Select
            labelId="marca"
            name="marca"
            label="Marca del dispositivo"
            value={values.marca}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="">Seleccionar marca</MenuItem>
            {marcas?.map((marca) => (
              <MenuItem key={marca.id} value={marca.id}>
                {marca.nombre}
              </MenuItem>
            ))}
          </Select>
          {touched.marca && errors.marca && (
            <FormHelperText>{errors.marca}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          size="small"
          disabled={guardado}
          error={touched.modelos_id && Boolean(errors.modelos_id)}
          sx={{ width: "33%" }}
        >
          <InputLabel htmlFor="modelos_id" id="modelos_id">
            Modelo del dispositivo
          </InputLabel>
          <Select
            label="Modelo del dispositivo"
            labelId="modelos_id"
            name="modelos_id"
            value={values.modelos_id}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="">Seleccionar modelo</MenuItem>
            {modelos?.map((modelo) => (
              <MenuItem key={modelo.id} value={modelo.id}>
                {modelo.nombre}
              </MenuItem>
            ))}
          </Select>
          {touched.modelos_id && errors.modelos_id && (
            <FormHelperText>{errors.modelos_id}</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          size="small"
          name="cosmetica"
          label="Estado cosmetico del dispositivo"
          disabled={guardado}
          value={values.cosmetica}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.cosmetica && Boolean(errors.cosmetica)}
          helperText={touched.cosmetica && errors.cosmetica}
          sx={{ width: "75%", mr: 2 }}
        />
        <TextField
          size="small"
          name="color"
          label="Color del dispositivo"
          disabled={guardado}
          value={values.color}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.color && Boolean(errors.color)}
          helperText={touched.color && errors.color}
          sx={{ width: "25%" }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          size="small"
          name="averia"
          label="Sintoma detectado por el cliente"
          disabled={guardado}
          value={values.averia}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.averia && Boolean(errors.averia)}
          helperText={touched.averia && errors.averia}
          sx={{ width: "50%", mr: 2 }}
        />

        <FormControl sx={{ width: "25%", mr: 2 }}>
          <InputLabel htmlFor="fechaCompra" shrink={true}>
            Fecha de compra
          </InputLabel>

          <TextField
            size="small"
            name="fechaCompra"
            type="date"
            disabled={guardado}
            value={values.fechaCompra}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fechaCompra && Boolean(errors.fechaCompra)}
            helperText={touched.fechaCompra && errors.fechaCompra}
          />
        </FormControl>
        <Button
          disabled={isSubmitting}
          sx={{ width: "25%", textTransform: "none", height: "40px" }}
          variant="contained"
          color="primary"
          type="submit"
          size="small"
        >
          {guardado ? "Dispositivo Guardado" : "Guardar Dispositivo"}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormDispositivo;
