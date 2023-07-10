import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import useScrollUp from "../hooks/useScrollUp";

export default function OrdersPrint() {
  const [order, setOrder] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { user } = useUserContext();
  const { id } = useParams();
  useScrollUp();

  const operaciones = [
    {
      tipo: "Sustitución",
      nombreProducto: "pantalla LCD",
      precio: 50,
      unidades: 1,
    },
    {
      tipo: "Sustitucion",
      nombreProducto: "Bateria Original",
      precio: 30,
      unidades: 1,
    },
  ];
  const fechaActual = new Date().toLocaleDateString("es-ES");
  useEffect(() => {
    const printFetch = async () => {
      try {
        setCargando(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}ot/print/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        setOrder(data);

        setCargando(false);
      } catch (error) {
        console.error("Error al obtener la Orden:", error);
      }
    };
    printFetch();
  }, []);

  useEffect(() => {
    if (order) {
      window.print();
    }
  }, [order]);

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {" "}
      <Typography variant="body1" align="right">
        Fecha: {fechaActual}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Factura 000{`${order?.id}`}
      </Typography>
      {/* Datos del cliente */}
      <Box mb={2}>
        <Typography variant="h5">Datos del cliente:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Nombre: {order?.cliente}</Typography>
            <Typography variant="body1">Email: {order?.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">DNI: {order?.dni}</Typography>
            <Typography variant="body1">Teléfono: {order?.telefono}</Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">Dirección: {order?.direccion}</Typography>
      </Box>
      {/* Datos de la reparación */}
      <Box mb={2}>
        <Typography variant="h5">Datos del dispositivo:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Marca: {order?.marca}</Typography>
            <Typography variant="body1">Modelo: {order?.modelo}</Typography>
            <Typography variant="body1">IMEI: {order?.imei}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Fecha de compra: {order?.fechaCompra}
            </Typography>
            <Typography variant="body1">Color: {order?.color}</Typography>
          </Grid>
        </Grid>

        <Typography variant="body1">Cosmética: {order?.cosmetica}</Typography>

        <Typography variant="body1">
          Avería detectada por el cliente: {order?.averiaDetectadaCliente}
        </Typography>

        <Typography variant="body1">Estado: {order?.estado}</Typography>
        <Typography variant="body1">
          Tipo de garantía: {order?.tipoGarantia}
        </Typography>
        <Typography variant="body1">
          Fecha de entrada: {order?.fechaEntrada}
        </Typography>
        <Typography variant="body1">
          Fecha de modificación: {order?.fechaModificacion}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h5">Resolucion:</Typography>
        <Typography variant="body1">
          Avería detectada por el SAT: {order?.averiaDetectadaSat}
        </Typography>
        <Typography variant="body1">
          Descripción: {order?.descripcionDetectadaSat}
        </Typography>
      </Box>
      {/* Operaciones */}
      <Box mb={2}>
        <Typography variant="h5">Operaciones:</Typography>
        {operaciones?.map((operacion, index) => (
          <Box
            key={index}
            mb={1}
            pb={1}
            borderBottom="1px solid grey"
            display="flex"
            flexDirection="column"
          >
            <Typography variant="body1">
              Tipo de operación: {operacion.tipo}
            </Typography>
            <Typography variant="body1">
              Nombre del producto: {operacion.nombreProducto}
            </Typography>
            <Typography variant="body1">
              Precio: {operacion.precio.toFixed(2)}€
            </Typography>
            <Typography variant="body1">
              Unidades: {operacion.unidades}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Precio total */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body1">
            Precio total: {calculateTotalPrice(operaciones)} €
          </Typography>
          <Typography variant="body1">IVA: 21.00%</Typography>
          <Typography variant="body1">
            Precio total + IVA: {calculateTotalPriceWithIVA(operaciones)} €
          </Typography>
        </Box>
        <Box
          to={`/order-status/${order?.uuid}`}
          component={Link}
          sx={{ display: "flex", textAlign: "flex-end" }}
          mr={4}
        >
          <QRCode
            value={`${import.meta.env.VITE_URL}order-status/${order?.uuid}`}
          />
        </Box>
      </Box>
      <Box mb={2}>
        <Typography variant="h5">Descripcion:</Typography>
        <Typography variant="body1">
          {order?.observacionesDetectadaSat}
        </Typography>
      </Box>
      {/* Observaciones */}
      {/* Firmar como entregado */}
      <Box>
        <Typography mb={2} variant="h5">
          Firmar como entregado:
        </Typography>
        <Box
          border="1px solid grey"
          borderRadius={4}
          p={2}
          textAlign="center"
          fontStyle="italic"
        >
          Firma: _______________________________________
        </Box>
      </Box>
    </Paper>
  );
}

function calculateTotalPrice(operaciones) {
  return operaciones.reduce((total, operacion) => {
    return total + operacion.precio * operacion.unidades;
  }, 0);
}

function calculateTotalPriceWithIVA(operaciones) {
  const precioTotal = calculateTotalPrice(operaciones);
  const iva = precioTotal * 0.21;
  return precioTotal + iva;
}
