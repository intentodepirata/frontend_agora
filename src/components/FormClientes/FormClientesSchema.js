import * as yup from "yup";

const dniRules = /^([0-9]{8}[A-Z])|[XYZ][0-9]{7}[A-Z]$/;
// 9 characters y una letra
export const FormClientesSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Campo requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: yup.string().required("Campo requerido"),
  telefono: yup
    .string()
    .required("Campo requerido")
    .min(9, "El número de teléfono debe tener al menos 9 dígitos"),
  dni: yup
    .string()
    .matches(dniRules, {
      message: "Debe contener un mínimo de 9 caracteres y una letra",
    })
    .required("Campo requerido"),
  direccion: yup
    .string()
    .required("Campo requerido")
    .min(5, "La dirección debe tener al menos 10 caracteres"),
});
