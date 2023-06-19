export const columnas = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "modelo", headerName: "Modelo", width: 150 },
  { field: "nombre", headerName: "Componente", width: 150 },
  {
    field: "cantidad",
    headerName: "Uds",
    width: 60,
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
];
export const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
export const rowsCarrito = [{ id: 1, modelo: "Galaxy S20", cantidad: 1 }];
