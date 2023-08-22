import * as yup from "yup";

export const TablaReparacionSchema = yup.object().shape({
  operacion: yup.string().required("Campo requerido"),
  componente: yup.string().required("Campo requerido"),
  tiempo: yup.number().required("Campo requerido"),
});
