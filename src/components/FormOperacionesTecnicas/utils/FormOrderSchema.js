import * as yup from "yup";

export const FormOrderSchema = yup.object().shape({
  descripcion: yup
    .string()
    .required("Campo requerido")
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  observaciones: yup
    .string()
    .optional()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  averia: yup.string().required("Campo requerido"),
  tipoGarantia: yup.string().required("Campo requerido"),
  state: yup.string().required("Campo requerido"),
});
