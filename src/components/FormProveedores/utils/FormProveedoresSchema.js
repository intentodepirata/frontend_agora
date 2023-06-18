import * as yup from "yup";

export const FormProveedoresSchema = yup.object().shape({
  empresa: yup
    .string()
    .required("Campo requerido")
    .min(3, "El nombre debe tener al menos 3 dígitos"),
  nombre: yup.string().required("Campo requerido"),
  email: yup.string().required("Campo requerido"),
  telefono: yup
    .number()
    .required("Campo requerido")
    .min(9, "El telefono debe tener al menos 9 dígitos"),
  web: yup
    .string()
    .required("Campo requerido")
    .url("La dirección web es invalida"),
  descripcion: yup.string().required("Campo requerido"),
});
