import * as yup from "yup";

export const FormLoginSchema = yup.object().shape({
  email: yup
    .string("Debe ser un string")
    .email("Por favor introduzca un email valido")
    .required("Requerido"),
  password: yup.string().required("Requerido"),
});
