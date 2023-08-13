import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import ProveedoresModal from "../ProveedoresModal/ProveedoresModal";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../../api/suppliers";

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

  useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers(user.token),
    onSuccess: (data) => setProveedores(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });
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
  };
  const solicitarPorEmail = (proveedor) => {
    const email = encodeURIComponent(proveedor.email);
    const asunto = encodeURIComponent("Solicitud de pedido");
    const cuerpo = encodeURIComponent(generarMensajeCarrito());
    const url = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
    window.open(url);
    setRowsCarrito([]);
    closeModal();
  };
  return (
    <Box>
      <Button
        onClick={abrirModalProveedores}
        color="success"
        variant="contained"
        endIcon={<LocalShippingIcon />}
        sx={{ width: { xs: "100%", md: "auto" } }}
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
    </Box>
  );
};
export default Carrito;
