import * as yup from "yup";

export const TablaReparacionSchema = yup.object().shape({
  operacion: yup.string().required("Campo requerido"),
  componente_id: yup.string().required("Campo requerido"),
  tiempo: yup.string().required("Campo requerido"),
});
