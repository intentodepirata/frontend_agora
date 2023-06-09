import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useState } from "react";

function createData(id, operacion, componente, pdtStock, tiempo, precio) {
  return { id, operacion, componente, pdtStock, tiempo, precio };
}

const rows = [
  createData(1, "sustitucion", "pantalla", false, 0.75, 124),
  createData(2, "sustitucion", "Adhesivo", false, 0, 1.99),
];

export default function TablaOperaciones() {
  const [operacion, setOperacion] = useState("");
  const [componente, setComponente] = useState("");
  const [costeOperacion, setCosteOperacion] = useState(0);
  const handleOperacion = (event) => {
    setOperacion(event.target.value);
  };
  const handleComponente = (event) => {
    setComponente(event.target.value);
  };
  const handleCosteOperacion = (event) => {
    setCosteOperacion(event.target.value);
  };
  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
        <FormControl fullWidth>
          <InputLabel size="small">Agregar Operacion</InputLabel>
          <Select
            size="small"
            value={operacion}
            label="Agregar Operacion"
            onChange={handleOperacion}
          >
            <MenuItem value={"sustitucion"}>Sustitucion</MenuItem>
            <MenuItem value={"componente presupuestado"}>
              Componente presupuestado
            </MenuItem>
            <MenuItem value={"ajuste mecanico"}>Ajuste Mecanico</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel size="small">Agregar Componente</InputLabel>
          <Select
            size="small"
            value={componente}
            label="Agregar Componente"
            onChange={handleComponente}
          >
            <MenuItem value={"Pantalla"}>Pantalla</MenuItem>
            <MenuItem value={"Bateria"}>Bateria</MenuItem>
            <MenuItem value={"Sub PBA"}>Sub PBA</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel size="small">Coste operacion</InputLabel>
          <Select
            size="small"
            value={costeOperacion}
            label="Coste operacion"
            onChange={handleCosteOperacion}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={0.25}>0.25</MenuItem>
            <MenuItem value={0.5}>0.50</MenuItem>
            <MenuItem value={0.75}>0.75</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          color="primary"
        >
          Agregar
        </Button>
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Operacion
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Componente
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Pendiente Stock
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Tiempo
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Precio
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.operacion}</TableCell>
              <TableCell align="right">{row.componente}</TableCell>
              <TableCell align="right">{row.pdtStock ? "Si" : "No"}</TableCell>
              <TableCell align="right">{row.tiempo}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
