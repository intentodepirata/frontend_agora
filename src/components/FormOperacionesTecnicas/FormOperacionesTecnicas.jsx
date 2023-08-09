import {
  Box,
  Paper,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import CheckListRevision from "../CheckListRevision/CheckListRevision";
import TablaReparacion from "../TablaReparacion/TablaReparacion";
import { nombreAverias } from "./utils/nombreAverias";
import { useUserContext } from "../../contexts/UserContext";
import { initialValues } from "./utils/initialValues";
import { useQuery } from "@tanstack/react-query";
import { getStates } from "../../api/states";
import { FormOrderSchema } from "./utils/FormOrderSchema";
import { useFormik } from "formik";

const FormOperacionesTecnicas = ({
  order,
  createOrderMutation,
  updateOrderMutation,
  createChecklistMutation,
  updateChecklistMutation,
  entregada,
}) => {
  const [estados, setEstados] = useState([]);

  const { user } = useUserContext();

  const queryStates = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(user.token),
    onSuccess: (data) => {
      setEstados(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    isSubmitting,
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    initialValues: order ? order.order : initialValues,
    validationSchema: FormOrderSchema,
    onSubmit: async function (values, actions) {
      order
        ? updateOrderMutation.mutate(values)
        : createOrderMutation.mutate(values);
    },
  });

  const getSelectedValue = (array, value, property) => {
    return array.find((item) => item.id === value)?.[property] || "";
  };
  return (
    <Paper elevation={4} sx={{ p: 2, display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            my: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "end" }}>
            <Typography variant="h4" color="primary" fontWeight={"bold"}>
              {order ? `OT000${order?.order?.id}` : "Nueva Orden"}
            </Typography>
            {entregada ? (
              <Typography ml={2} variant="h6" color="primary">
                Entregada
              </Typography>
            ) : (
              <Typography ml={2} variant="h6" color="primary">
                {estados &&
                  estados.find((estado) => estado.id === values.estado_id)
                    ?.nombre}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormControl
              htmlFor="averia"
              sx={{ mb: 2, mt: 0.5, width: "100%" }}
            >
              <InputLabel
                error={touched.averia && Boolean(errors.averia)}
                size="small"
                id="averia"
              >
                Averia principal
              </InputLabel>
              <Select
                label="Averia principal"
                labelId="averia"
                name="averia"
                value={values.averia}
                onChange={handleChange}
                onBlur={handleBlur}
                size="small"
                disabled={entregada}
                error={touched.averia && Boolean(errors.averia)}
              >
                <MenuItem value="">Seleccionar Averia</MenuItem>
                {nombreAverias.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {touched.averia && errors.averia && (
                <FormHelperText
                  error={touched.averia && Boolean(errors.averia)}
                >
                  {errors.averia}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              size="small"
              label="Descripcion"
              name="descripcion"
              value={values.descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.descripcion && errors.descripcion}
              error={touched.descripcion && Boolean(errors.descripcion)}
              disabled={entregada}
            />
            <TextField
              sx={{ mt: 2 }}
              name="observaciones"
              fullWidth
              label="Observaciones Tecnicas"
              multiline
              rows={2}
              variant="filled"
              value={values.observaciones}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.observaciones && errors.observaciones}
              error={touched.observaciones && Boolean(errors.observaciones)}
              disabled={entregada}
            />
          </Box>
        </Box>

        <Typography
          textAlign="center"
          variant="h6"
          color="grey"
          fontWeight={"bold"}
          m={2}
        >
          Operaciones Servicio Tecnico
        </Typography>
        <TablaReparacion
          order={order}
          handleSubmit={handleSubmit}
          entregada={entregada}
        />
      </Box>
      <Box sx={{ ml: 4 }}>
        <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="initial">
              Total a Facturar
            </Typography>
            <Typography variant="h6" color="initial">
              {order && `${order?.order.precio}€`}
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={4} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              m: 2,
            }}
          >
            <FormControl
              error={touched.estado_id && Boolean(errors.estado_id)}
              sx={{ m: 1, width: 220 }}
            >
              <InputLabel id="estado">Estado</InputLabel>
              <Select
                labelId="estado"
                value={getSelectedValue(estados, values.estado_id, "id")}
                onChange={handleChange}
                onBlur={handleBlur}
                autoWidth
                label="Estado"
                name="estado_id"
                disabled={entregada}
              >
                <MenuItem value={""}>
                  <em>Seleccione</em>
                </MenuItem>
                {estados?.map((estado) => (
                  <MenuItem key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </MenuItem>
                ))}
              </Select>
              {touched.estado_id && errors.estado_id && (
                <FormHelperText>{errors.estado_id}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={touched.tipoGarantia && Boolean(errors.tipoGarantia)}
              sx={{ m: 1, width: 220 }}
            >
              <InputLabel id="tipoGarantia">Tipo de Garantia</InputLabel>
              <Select
                labelId="tipoGarantia"
                value={values.tipoGarantia}
                onChange={handleChange}
                onBlur={handleBlur}
                autoWidth
                label="Tipo de Garantia"
                name="tipoGarantia"
                disabled={entregada}
              >
                <MenuItem value={""}>
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value="En Garantia">En Garantia</MenuItem>
                <MenuItem value="Fuera de Garantia">Fuera de Garantia</MenuItem>
                <MenuItem value="Seguro">Seguro</MenuItem>
                <MenuItem value="Garantia SAT">Garantia SAT</MenuItem>
                <MenuItem value="Cortesia">Cortesia</MenuItem>
                <MenuItem value="Irreparable">Irreparable</MenuItem>
              </Select>
              {touched.tipoGarantia && errors.tipoGarantia && (
                <FormHelperText>{errors.tipoGarantia}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <CheckListRevision
            checklist={order?.checklist}
            createChecklistMutation={createChecklistMutation}
            s
            updateChecklistMutation={updateChecklistMutation}
            entregada={entregada}
          />
        </Paper>
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
      </Box>
    </Paper>
  );
};

export default FormOperacionesTecnicas;
