const datosModelos = [
  {
    modelo: "Apple iPhone 12",
    averias: [
      { nombre: "Pantalla Rota", cantidad: 10 },
      { nombre: "Conector de Carga", cantidad: 8 },
      { nombre: "Batería", cantidad: 12 },
    ],
  },
  {
    modelo: "Samsung Galaxy S21 Ultra",
    averias: [
      { nombre: "Pantalla Rota", cantidad: 5 },
      { nombre: "Conector de Carga", cantidad: 6 },
      { nombre: "Batería", cantidad: 3 },
    ],
  },
  {
    modelo: "Apple iPhone 11 Pro",
    averias: [
      { nombre: "Pantalla Rota", cantidad: 12 },
      { nombre: "Conector de Carga", cantidad: 10 },
      { nombre: "Batería", cantidad: 11 },
    ],
  },
  {
    modelo: "Apple iPhone 13 Pro Max",
    averias: [
      { nombre: "Pantalla Rota", cantidad: 12 },
      { nombre: "Conector de Carga", cantidad: 10 },
      { nombre: "Batería", cantidad: 11 },
    ],
  },
  {
    modelo: "Xiaomi Redmi Note 10",
    averias: [
      { nombre: "Pantalla Rota", cantidad: 12 },
      { nombre: "Conector de Carga", cantidad: 10 },
      { nombre: "Batería", cantidad: 11 },
    ],
  },
];

const categories = datosModelos.map((modelo) => modelo.modelo);
const seriesData = datosModelos.map((modelo) =>
  modelo.averias.map((averia) => averia.cantidad)
);

const series = [
  {
    name: "Pantalla Rota",
    data: seriesData.map((data) => data[0]),
  },
  {
    name: "Conector de Carga",
    data: seriesData.map((data) => data[1]),
  },
  {
    name: "Batería",
    data: seriesData.map((data) => data[2]),
  },
];

export const options = {
  chart: {
    type: "bar",
  },
  title: {
    text: "Top 5 Modelos Más Reparados",
  },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    title: {
      text: "Cantidad de Reparaciones",
    },
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: "normal",
    },
  },
  series: series,
};
