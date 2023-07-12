export const columnsOrders = [
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
export const columnsProveedores = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "empresa", headerName: "Empresa", width: 200 },
  { field: "nombre", headerName: "Persona de Contacto", width: 140 },
  { field: "email", headerName: "Email", width: 240 },
  { field: "telefono", headerName: "Telefono", width: 120 },
  { field: "web", headerName: "Sitio Web", width: 260 },
  { field: "descripcion", headerName: "Descripcion", width: 320 },
];

export const columnsProducts = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "nombre", headerName: "Producto", width: 200 },
  { field: "modelo", headerName: "Modelo", width: 180 },
  { field: "marca", headerName: "Marca", width: 80 },
  { field: "fechaRegistro", headerName: "Fecha de Entrada", width: 160 },
  { field: "existencias", headerName: "Existencias", width: 140 },
];

export const columnsServicios = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "servicio", headerName: "Servicio", width: 200 },
  { field: "precio", headerName: "Precio", width: 100 },
];

export const columnsChecklist = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "nombre", headerName: "Nombre", width: 200 },
];
