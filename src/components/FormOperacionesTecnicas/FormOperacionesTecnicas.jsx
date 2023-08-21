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
import { initialState } from "../CheckListRevision/utils/initialState";

const FormOperacionesTecnicas = ({
  order,
  createOrderMutation,
  updateOrderMutation,
  createChecklistMutation,
  updateChecklistMutation,
  entregada,
}) => {
  const [estados, setEstados] = useState([]);
  const [stateChecklist, setStateChecklist] = useState(initialState);
  const { user } = useUserContext();

  useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(user.token),
    onSuccess: (data) => setEstados(data.data),
    onError: (error) => {
      console.log(error);
    },
  });
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: order
        ? {
            averia: order?.averia,
            descripcion: order?.descripcion,
            observaciones: order?.observaciones,
            tipoGarantia: order?.tipoGarantia,
            state: order?.state?.id,
          }
        : initialValues,
      validationSchema: FormOrderSchema,
      onSubmit: async function (values) {
        try {
          if (order) {
            updateChecklistMutation.mutate(stateChecklist);
            updateOrderMutation.mutate(values);
          } else {
            const { data: checklist } =
              await createChecklistMutation.mutateAsync(stateChecklist);

            await createOrderMutation.mutateAsync({
              ...values,
              checklist: checklist?.id,
            });
          }
        } catch (error) {
          console.error(error.message);
        }
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
              {order ? `OT000${order?.otNumber}` : "Nueva Orden"}
            </Typography>
            {entregada ? (
              <Typography ml={2} variant="h6" color="primary">
                Entregada
              </Typography>
            ) : (
              <Typography ml={2} variant="h6" color="primary">
                {estados &&
                  estados.find((estado) => estado.id === values.state)?.estado}
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
        <TablaReparacion order={order} entregada={entregada} />
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
              {order ? `${order?.precio}€` : "0€"}
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
              error={touched.state && Boolean(errors.state)}
              sx={{ m: 1, width: 220 }}
            >
              <InputLabel id="estado">Estado</InputLabel>
              <Select
                labelId="estado"
                value={getSelectedValue(estados, values.state, "id")}
                onChange={handleChange}
                onBlur={handleBlur}
                autoWidth
                label="Estado"
                name="state"
                disabled={entregada}
              >
                <MenuItem value={""}>
                  <em>Seleccione</em>
                </MenuItem>
                {estados?.map((estado) => (
                  <MenuItem key={estado.id} value={estado.id}>
                    {estado.estado}
                  </MenuItem>
                ))}
              </Select>
              {touched.state && errors.state && (
                <FormHelperText>{errors.state}</FormHelperText>
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
            order={order}
            createChecklistMutation={createChecklistMutation}
            updateChecklistMutation={updateChecklistMutation}
            entregada={entregada}
            setStateChecklist={setStateChecklist}
            stateChecklist={stateChecklist}
            values={values}
            handleSubmit={handleSubmit}
          />
        </Paper>
        {/* <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      </Box>
    </Paper>
  );
};

export default FormOperacionesTecnicas;
