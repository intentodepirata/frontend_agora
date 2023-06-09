import * as yup from "yup";

export const FormProductSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Campo requerido")
    .min(3, "El nombre debe tener al menos 3 dígitos"),
  cantidad: yup.number().required("Campo requerido"),
  marca: yup.string().required("Campo requerido"),
  modelos_id: yup.string().required("Campo requerido"),
  precio: yup.number().required("Campo requerido"),
  modelos_id: yup.string().required("Campo requerido"),
});
