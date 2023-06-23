import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const FormRegisterSchema = yup.object().shape({
  email: yup
    .string("Debe ser un string")
    .email("Por favor introduzca un email valido")
    .required("Requerido"),
  nombre: yup.string("El nombre no es valido").required("Requerido"),
  apellidos: yup.string("El apellido no es valido").required("Requerido"),
  telefono: yup.number("").required("Requerido"),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Debe contener un minimo de 5 caracteres, 1 mayuscula, 1 minuscula y 1 numero",
    })
    .required("Requerido"),
});
