import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { columns } from "./utils/columnsValues";
import { useUserContext } from "../../contexts/UserContext";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay/CustomNoRowsOverlay";
import { enqueueSnackbar } from "notistack";
import { findProductsModel } from "../../api/components";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addOperation,
  deleteOperation,
  findOperations,
} from "../../api/operations";
import { useFormik } from "formik";
import { initialValues } from "./utils/initialValues";
import { TablaReparacionSchema } from "./utils/TablaReparacionSchema";
import HandleConfirmNotification from "../../ui/HandleConfirmNotification";

const TablaReparacion = ({ order, entregada }) => {
  const [selectionModel, setSelectionModel] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const [rows, setRows] = useState([]);
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  useQuery({
    queryKey: ["model-products"],
    queryFn: () => findProductsModel(order?.order.dispositivo_id, user.token),
    onSuccess: (data) => setComponentes(data.data),
    onError: (error) => {
      console.error(error.message);
    },
    enabled: Boolean(order?.order),
  });

  const queryOperations = useQuery({
    queryKey: ["operaciones"],
    queryFn: () => findOperations(order?.order.id, user.token),
    onSuccess: (data) => {
      setRows(data.data);
    },
    onError: (error) => {
      console.error(error.message);
    },
    enabled: Boolean(order?.order),
  });

  const createMutation = useMutation({
    mutationFn: (values) =>
      addOperation({ ...values, ots_id: order?.order.id }, user.token),
    onSuccess: () => {
      enqueueSnackbar("Operacion agregada correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["operaciones"]);
      queryClient.invalidateQueries(["order"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteOperation(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Operacion eliminada correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["operaciones"]);
      queryClient.invalidateQueries(["order"]);
    },
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit: handleSubmitOperation,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: TablaReparacionSchema,
    onSubmit: async function (values, actions) {
      createMutation.mutate(values);
      actions.resetForm();
    },
  });

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleDelete = (id) => {
    if (!selectionModel) {
      enqueueSnackbar("No hay operaciones seleccionadas", {
        variant: "info",
        persist: true,
      });
      return;
    }

    enqueueSnackbar("Desear eliminar la operacion?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={deleteMutation}
        />
      ),
    });
  };

  const getSelectedValue = (array, value, property) => {
    return array.find((item) => item.id === value)?.[property] || "";
  };
  return (
    <Box>
      <Box
        onSubmit={handleSubmitOperation}
        component={"form"}
        sx={{ display: "flex", gap: 2, pt: 1, alignItems: "center" }}
      >
        <FormControl
          error={touched.operacion && Boolean(errors.operacion)}
          fullWidth
        >
          <InputLabel size="small">Agregar Operacion</InputLabel>
          <Select
            name="operacion"
            size="small"
            value={values.operacion}
            label="Agregar Operacion"
            onChange={handleChange}
            disabled={entregada}
          >
            <MenuItem value={""}>
              <em>Seleccione</em>
            </MenuItem>
            <MenuItem value={"sustitucion"}>Sustitucion</MenuItem>
            <MenuItem value={"componente presupuestado"}>
              Componente presupuestado
            </MenuItem>
            <MenuItem value={"ajuste mecanico"}>Ajuste Mecanico</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          error={touched.componentes_id && Boolean(errors.componentes_id)}
          fullWidth
        >
          <InputLabel size="small">Agregar Componente</InputLabel>
          <Select
            name="componentes_id"
            size="small"
            value={getSelectedValue(componentes, values.componentes_id, "id")}
            label="Agregar Componente"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={entregada}
          >
            <MenuItem value={""}>
              {componentes.length === 0
                ? "No hay componentes en el inventario"
                : "Seleccione un componente"}
            </MenuItem>
            {componentes.map((componente) => (
              <MenuItem key={componente.id} value={componente.id}>
                {componente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl error={touched.tiempo && Boolean(errors.tiempo)} fullWidth>
          <InputLabel size="small">Tiempo operacion</InputLabel>
          <Select
            name="tiempo"
            size="small"
            value={values.tiempo}
            label="Tiempo operacion"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={entregada}
          >
            <MenuItem value={""}>
              <em>Seleccione</em>
            </MenuItem>
            <MenuItem value={"0"}>0</MenuItem>
            <MenuItem value={"0.25"}>0.25</MenuItem>
            <MenuItem value={"0.5"}>0.50</MenuItem>
            <MenuItem value={"0.75"}>0.75</MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={entregada || createMutation.isLoading}
        >
          {createMutation.isLoading ? (
            <CircularProgress size={"26px"} color="grey" />
          ) : (
            "Agregar"
          )}
        </Button>
      </Box>
      <Box sx={{ mt: 2, height: "375px", width: "100%", minWidth: "400px" }}>
        <DataGrid
          sx={{
            "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
              color: "grey",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          onRowSelectionModelChange={handleSelectionModelChange}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            loadingOverlay: LinearProgress,
          }}
          loading={Boolean(queryOperations.isFetching)}
        />
      </Box>

      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
        <Button
          onClick={() => handleDelete(selectionModel)}
          color="error"
          variant="contained"
          disabled={entregada || deleteMutation.isLoading}
          endIcon={
            deleteMutation.isLoading ? (
              <CircularProgress size={"14px"} color="grey" />
            ) : (
              <DeleteIcon />
            )
          }
        >
          Eliminar operación
        </Button>
      </Stack>
    </Box>
  );
};
export default TablaReparacion;
