import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ProveedoresModal from "../ProveedoresModal/ProveedoresModal";
import { enqueueSnackbar } from "notistack";

const Carrito = ({ rowsCarrito, user, setRowsCarrito }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const abrirModalProveedores = () => {
    setModalAbierto(true);
  };
  const closeModal = () => {
    setModalAbierto(false);
    setProveedorSeleccionado(null);
  };

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}proveedores/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
      }
    };

    obtenerProveedores();
  }, []);
  const seleccionarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
  };
  const generarMensajeCarrito = () => {
    const mensaje = "¡Hola! Estoy interesado en los siguientes productos:\n\n";

    const productos = rowsCarrito.map((producto) => {
      return `• Nombre: ${producto.nombre}\n  Modelo: ${producto.modelo}\n  Cantidad: ${producto.cantidad}\n`;
    });

    return mensaje + productos.join("\n");
  };
  const solicitarPorWhatsApp = (proveedor) => {
    const telefono = encodeURIComponent(`+34${proveedor.telefono}`);
    const mensaje = encodeURIComponent(generarMensajeCarrito());
    const enlace = `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

    closeModal();
    window.open(enlace, "_blank");
    setRowsCarrito([]);
    enqueueSnackbar("Pedido Realizado por WhatsApp", {
      variant: "success",
    });
  };
  const solicitarPorEmail = (proveedor) => {
    const email = encodeURIComponent(proveedor.email);
    const asunto = encodeURIComponent("Solicitud de pedido");
    const cuerpo = encodeURIComponent(generarMensajeCarrito());
    const url = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
    // window.location.href = url;
    window.open(url, "_blank");
    setRowsCarrito([]);
    closeModal();
    enqueueSnackbar("Pedido Realizado por Email", {
      variant: "success",
    });
  };
  return (
    <>
      <Button
        onClick={abrirModalProveedores}
        color="success"
        variant="contained"
        endIcon={<LocalShippingIcon />}
      >
        Solicitar
      </Button>

      <ProveedoresModal
        modalAbierto={modalAbierto}
        proveedores={proveedores}
        proveedorSeleccionado={proveedorSeleccionado}
        seleccionarProveedor={seleccionarProveedor}
        solicitarPorWhatsApp={solicitarPorWhatsApp}
        solicitarPorEmail={solicitarPorEmail}
        closeModal={closeModal}
      />
    </>
  );
};
export default Carrito;
