export const columns = [
  { field: "id", headerName: "OT", width: 80 },
  { field: "marca", headerName: "Marca", width: 80 },
  { field: "modelo", headerName: "Modelo", width: 160 },
  {
    field: "imei",
    headerName: "IMEI",
    width: 135,
  },
  { field: "cliente", headerName: "Cliente", width: 170 },
  { field: "telefono", headerName: "Telefono", width: 100 },
  { field: "dni", headerName: "DNI", width: 100 },
  { field: "estado", headerName: "Estado", width: 170 },
  { field: "tipoGarantia", headerName: "Tipo de Garantia", width: 140 },

  {
    field: "fechaEntrada",
    headerName: "Fecha de entrada",
    width: 150,
  },
  {
    field: "entregada",
    headerName: "Entregada",
    align: "center",
    valueGetter: (params) => (params.value === 1 ? "Sí" : "No"),
    width: 80,
  },
];
