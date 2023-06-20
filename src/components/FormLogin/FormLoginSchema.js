import * as yup from "yup";

export const FormLoginSchema = yup.object().shape({
  email: yup
    .string("Debe ser un string")
    .email("Por favor introduzca un email valido")
    .required("Requerido"),
  password: yup
    .string()
    .required("Requerido")
    .min(
      8,
      "Debe contener un minimo de 5 caracteres, 1 mayuscula, 1 minuscula y 1 numero"
    ),
});
