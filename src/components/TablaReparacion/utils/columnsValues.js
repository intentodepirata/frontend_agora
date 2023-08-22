export const columns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "operacion",
    headerName: "Operacion",
    width: 200,
  },
  {
    field: "componente",
    headerName: "Componente",
    width: 200,
  },
  {
    field: "stock",
    headerName: "En Stock",
    valueGetter: (params) => (params.value ? "Sí" : "No"),

    width: 150,
  },
  {
    field: "tiempo",
    headerName: "Tiempo",
    width: 150,
  },

  {
    field: "precio",
    headerName: "Precio",
    width: 150,
  },
  {
    field: "fechaRegistro",
    headerName: "Fecha operacion",
    width: 150,
  },
];
