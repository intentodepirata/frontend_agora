export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  border: " 1px solid grey",
  py: 4,
  px: 4,
};

export const steps = [
  { label: "Productos" },
  { label: "Tarjetas" },
  { label: "Cupones" },
  { label: "Resumen" },
];

export const planOptions = [
  {
    label: "Básico Mensual",
    value: "month",
    description: "Tu plan se renovará automáticamente cada mes",
    price: "19.99€/mes",
  },
  {
    label: "Básico Anual",
    value: "year",
    description: "Un solo pago cada año",
    price: "179.99€/año",
  },
];
export const initialCardData = {
  cardNumber: "",
  cardType: "",
  cardYear: "",
  cardMonth: "",
  cardName: "",
};
