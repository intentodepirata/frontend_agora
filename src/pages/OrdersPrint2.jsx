import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import useScrollUp from "../hooks/useScrollUp";
import dayjs from "dayjs";

export default function OrdersPrint2() {
  const [order, setOrder] = useState(null);
  const [operaciones, setOperaciones] = useState([]);
  const [precio, setPrecio] = useState(null);
  const { user } = useUserContext();
  const { id } = useParams();
  useScrollUp();

  const fecha = dayjs().format("DD/MM/YYYY HH:mm:ss");
  useEffect(() => {
    const printFetch = async () => {
      try {
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
      } catch (error) {
        console.error("Error al obtener la Orden:", error);
      }
    };
    const fetchOperacionesByOt = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}operacion/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setOperaciones(data);
        } else {
          console.error("Error al obtener las operaciones:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener las operaciones:", error);
      }
    };

    const fetchPrecio = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}ot/price/${id}`
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setPrecio(data);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };
    fetchOperacionesByOt();
    fetchPrecio();
    printFetch();
  }, []);

  useEffect(() => {
    if (order) {
      window.print();
    }
  }, [order]);

  function calculateIVA(precio) {
    return precio * 0.21;
  }
  function calculateTotalPriceWithIVA(precio) {
    return calculateIVA(precio) + precio;
  }

  return (
    <Paper
      sx={{
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "960px",
        },
        margin: "0 auto",
        padding: 2,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component={"img"}
            src={user?.negocio.logo}
            sx={{ width: "200px" }}
            alt="logo negocio"
            mr={2}
          />
        </Box>

        <Box
          width="100%"
          maxWidth="300px"
          textAlign={"center"}
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid lightgrey",
          }}
        >
          <Typography
            component="h1"
            variant="body1"
            color="white"
            sx={{ bgcolor: "black" }}
          >
            # Orden
          </Typography>
          <Typography variant="body2" color="initial">
            OT-000000{order?.id}
          </Typography>
          <Typography variant="body2" color="initial">
            {fecha}
          </Typography>
        </Box>
        <Box to={`/order-status/${order?.uuid}`} component={Link}>
          <QRCode
            value={`${import.meta.env.VITE_URL}order-status/${order?.uuid}`}
            size={100}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid lightgrey",
          }}
        >
          <Typography
            component="h1"
            variant="body1"
            color="white"
            sx={{ bgcolor: "black" }}
          >
            Negocio
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Nombre:</strong> {user?.negocio.nombre}
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Telefono:</strong> {user?.negocio.telefono}
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Direccion:</strong> {user?.negocio.direccion}
          </Typography>
        </Box>
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid lightgrey",
          }}
        >
          <Typography
            component="h1"
            variant="body1"
            color="white"
            sx={{ bgcolor: "black" }}
          >
            Cliente
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Nombre:</strong> {order?.cliente}
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Teléfono:</strong> {order?.telefono}
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Correo:</strong> {order?.email}
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>DNI:</strong> {order?.dni}
          </Typography>
          <Typography variant="body2" color="initial">
            <strong>Direccion:</strong> {order?.direccion}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid lightgrey",
        }}
      >
        <Typography
          component="h1"
          variant="body1"
          color="white"
          textAlign={"center"}
          sx={{ bgcolor: "black" }}
        >
          Datos del equipo
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Marca:</strong> {order?.marca}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Modelo:</strong> {order?.modelo}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Color:</strong> {order?.color}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>IMEI:</strong> {order?.imei}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Fecha de compra:</strong> {order?.fechaCompra}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Cosmética:</strong> {order?.cosmetica}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Averia:</strong> {order?.averiaDetectadaCliente}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid lightgrey",
        }}
      >
        <Typography
          component="h1"
          variant="body1"
          color="white"
          textAlign={"center"}
          sx={{ bgcolor: "black" }}
        >
          Resolución
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Estado:</strong> {order?.estado}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Tipo de garantía:</strong> {order?.tipoGarantia}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Fecha de entrada:</strong> {order?.fechaEntrada}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Fecha de resolución:</strong> {order?.fechaModificacion}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Avería detectada por el SAT:</strong>{" "}
          {order?.averiaDetectadaSat}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Descripción:</strong> {order?.descripcionDetectadaSat}
        </Typography>
        <Typography variant="body2" color="initial">
          <strong>Observaciones:</strong> {order?.observacionesDetectadaSat}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid lightgrey",
        }}
      >
        <Typography
          component="h1"
          variant="body1"
          color="white"
          textAlign={"center"}
          sx={{ bgcolor: "black" }}
        >
          Operaciones
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid lightgrey",
          }}
        >
          <Typography variant="body2" color="initial" fontWeight={"bold"}>
            Operacion
          </Typography>
          <Typography variant="body2" color="initial" fontWeight={"bold"}>
            Componente
          </Typography>
          <Typography variant="body2" color="initial" fontWeight={"bold"}>
            Cantidad
          </Typography>
          <Typography
            variant="body2"
            color="initial"
            fontWeight={"bold"}
            mr={2}
          >
            Precio
          </Typography>
        </Box>
        {operaciones &&
          operaciones.map((operacion) => (
            <Box
              key={operacion.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" color="initial">
                {operacion.operacion}
              </Typography>
              <Typography variant="body2" color="initial">
                {operacion.componente}
              </Typography>
              <Typography variant="body2" color="initial" width="60px">
                {operacion.stockDisponible && 1}
              </Typography>
              <Typography variant="body2" color="initial" width="33px" mr={2}>
                {operacion.precio}
              </Typography>
            </Box>
          ))}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box width="100%" sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex" }} width="200px">
          <Box width="100%">
            <Typography
              component="p"
              variant="body2"
              color="white"
              border="1px solid black"
              sx={{ bgcolor: "black" }}
            >
              Subtotal
            </Typography>
            <Typography
              component="p"
              variant="body2"
              color="white"
              border="1px solid black"
              sx={{ bgcolor: "black" }}
            >
              IVA 21%
            </Typography>
            <Typography
              component="p"
              variant="body2"
              color="white"
              border="1px solid black"
              sx={{ bgcolor: "black" }}
            >
              TOTAL
            </Typography>
          </Box>
          <Box width="100%" textAlign="right">
            <Typography
              component="p"
              variant="body2"
              border="1px solid lightgrey"
            >
              {precio}€
            </Typography>
            <Typography
              component="p"
              variant="body2"
              border="1px solid lightgrey"
            >
              {calculateIVA(precio).toFixed(2)}€
            </Typography>
            <Typography
              component="p"
              variant="body2"
              border="1px solid lightgrey"
            >
              {parseFloat(calculateTotalPriceWithIVA(precio)).toFixed(2)}€
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" color="initial">
        Metodo de Pago:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box width="300px" height="100px"></Box>
          <Typography
            width="300px"
            variant="body2"
            color="initial"
            textAlign="center"
            borderTop="1px solid black"
          >
            Firma Servicio Técnico
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box width="300px" height="100px"></Box>
          <Typography
            width="300px"
            variant="body2"
            color="initial"
            textAlign="center"
            borderTop="1px solid black"
          >
            Nombre y Firma Cliente
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography
        component="h2"
        variant="body1"
        color="white"
        textAlign={"center"}
        sx={{ bgcolor: "black" }}
      >
        Garantía
      </Typography>
      <Typography mt={3} component="p" variant="body2" px={4}>
        {user.negocio.politicas}
      </Typography>
    </Paper>
  );
}
