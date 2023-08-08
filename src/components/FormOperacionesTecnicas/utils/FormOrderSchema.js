import * as yup from "yup";

export const FormOrderSchema = yup.object().shape({
  descripcion: yup
    .string()
    .required("Campo requerido")
    .min(3, "La descripción debe tener al menos 5 caracteres"),
  observaciones: yup.string(),
  averia: yup.string().required("Campo requerido"),
  tipoGarantia: yup.string().required("Campo requerido"),
  estado_id: yup.string().required("Campo requerido"),
});
