import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import useScrollUp from "../hooks/useScrollUp";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { findOrderToPrint } from "../api/orders";
import { findOperations } from "../api/operations";

export default function OrdersPrintSmall() {
  const [order, setOrder] = useState(null);
  const [operaciones, setOperaciones] = useState(null);
  const fechaActual = dayjs().format("DD/MM/YYYY HH:mm:ss");
  const { user } = useUserContext();
  const { id } = useParams();
  useScrollUp();

  const queryPrint = useQuery({
    queryKey: ["print", id],
    queryFn: async () => {
      const [printData, operacionesData] = await Promise.all([
        findOrderToPrint(id, user.token),
        findOperations(id, user.token),
      ]);
      return {
        print: printData.data,
        operaciones: operacionesData.data,
      };
    },
    onSuccess: (data) => {
      setOrder(data.print);
      setOperaciones(data.operaciones);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  useEffect(() => {
    if (queryPrint.isSuccess) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [queryPrint.isSuccess]);

  function calculateIVA(precio) {
    return precio * 0.21;
  }
  function calculateTotalPriceWithIVA(precio) {
    return calculateIVA(precio) + precio;
  }

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body1" align="right">
        Fecha: {fechaActual}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Ticket 000{`${order?.id}`}
      </Typography>
      {/* Datos del cliente */}
      <Box mb={2}>
        <Typography variant="h5">Datos del cliente:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Nombre:</strong> {order?.cliente}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {order?.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>DNI:</strong> {order?.dni}
            </Typography>
            <Typography variant="body1">
              <strong>Teléfono:</strong> {order?.telefono}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">
          <strong>Dirección:</strong> {order?.direccion}
        </Typography>
      </Box>
      {/* Datos de la reparación */}
      <Box mb={2}>
        <Typography variant="h5">Datos del dispositivo:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Marca:</strong> {order?.marca}
            </Typography>
            <Typography variant="body1">
              <strong>Modelo:</strong> {order?.modelo}
            </Typography>
            <Typography variant="body1">
              <strong>IMEI:</strong> {order?.imei}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Fecha de compra:</strong> {order?.fechaCompra}
            </Typography>
            <Typography variant="body1">
              <strong>Color:</strong> {order?.color}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body1">
          <strong>Cosmética:</strong> {order?.cosmetica}
        </Typography>

        <Typography variant="body1">
          <strong>Avería detectada por el cliente:</strong>{" "}
          {order?.averiaDetectadaCliente}
        </Typography>

        <Typography variant="body1">
          <strong>Estado:</strong> {order?.estado}
        </Typography>
        <Typography variant="body1">
          <strong>Tipo de garantía:</strong> {order?.tipoGarantia}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de entrada:</strong> {order?.fechaEntrada}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de modificación:</strong> {order?.fechaModificacion}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h5">Resolucion:</Typography>
        <Typography variant="body1">
          <strong>Avería detectada por el SAT:</strong>{" "}
          {order?.averiaDetectadaSat}
        </Typography>
        <Typography variant="body1">
          <strong>Descripción:</strong> {order?.descripcionDetectadaSat}
        </Typography>
      </Box>
      {/* Operaciones */}
      <Box mb={2}>
        <Typography variant="h5">Operaciones:</Typography>
        {operaciones?.map((operacion) => (
          <Box
            key={operacion.id}
            mb={1}
            pb={1}
            borderBottom="1px solid grey"
            display="flex"
            flexDirection="column"
          >
            <Typography variant="body1">
              Tipo de operación: {operacion.operacion}
            </Typography>
            <Typography variant="body1">
              Nombre del producto: {operacion.componente}
            </Typography>
            <Typography variant="body1">
              Precio: {parseFloat(operacion.precio).toFixed(2)}€
            </Typography>
            <Typography variant="body1">
              Unidades: {operacion.stockDisponible && 1}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body1">
            Total: <strong> {parseFloat(order?.precio).toFixed(2)} €</strong>
          </Typography>
          <Typography variant="body1">
            IVA 21.00%:{" "}
            <strong> {calculateIVA(order?.precio).toFixed(2)}€</strong>
          </Typography>
          <Typography variant="body1">
            Total Final:
            <strong>
              {parseFloat(calculateTotalPriceWithIVA(order?.precio)).toFixed(2)}
              €
            </strong>
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
