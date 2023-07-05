import * as yup from "yup";

export const FormDispositivoSchema = yup.object().shape({
  marca: yup.string().required("Campo requerido"),
  modelos_id: yup.string().required("Campo requerido"),
  imei: yup
    .string()
    .required("Campo requerido")
    .length(15, "El número de serie imei es de 15 dígitos"),
  color: yup.string().required("Campo requerido"),
  averia: yup.string().required("Campo requerido"),
  cosmetica: yup.string().required("Campo requerido"),
  fechaCompra: yup.date().required("Campo requerido"),
});
