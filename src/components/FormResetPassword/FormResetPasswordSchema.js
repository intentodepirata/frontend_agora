import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const FormResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Debe contener un minimo de 5 caracteres, 1 mayuscula, 1 minuscula y 1 numero",
    })
    .required("Requerido"),
});
