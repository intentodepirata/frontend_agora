export const options = {
  chart: {
    type: "column",
  },
  title: {
    text: " Gastos vs Ingresos ",
  },
  xAxis: {
    categories: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
    ], // Agrega los meses que deseas mostrar
  },
  yAxis: {
    title: {
      text: "Cantidad (€)",
    },
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
  colors: ["red", "green"],
  series: [
    {
      name: "Gastos",
      data: [1000, 1500, 2000, 1200, 1800, 2500, 3000, 3900, 4500], // Agrega los valores de los gastos por mes
    },
    {
      name: "Ingresos",
      data: [2000, 2500, 1800, 2200, 2800, 3200, 4001, 4500, 5000], // Agrega los valores de los beneficios por mes
    },
  ],
};
