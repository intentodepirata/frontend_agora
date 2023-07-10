import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { style } from "./style/style";

export default function DatosOrdenModal({ modal, handleModal, id }) {
  const [cliente, setCliente] = useState(null);
  const [dispositivo, setDispositivo] = useState({});
  const { user } = useUserContext();
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}cliente/ot/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        setCliente(data);
      } catch (error) {
        console.error("Error al obtener al cliente");
      }
    };
    const fetchDispositivo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}dispositivo/ot/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        setDispositivo(data);
      } catch (error) {
        console.error("Error al obtener el dispositivo:");
      }
    };
    fetchCliente();
    fetchDispositivo();
  }, [id]);
  return (
    <div>
      <Modal
        open={modal}
        onClose={handleModal}
        aria-labelledby="modal-modal-mas-info"
        aria-describedby="modal-modal-ClientesyDispositivo"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography mb={2} variant="h6" component="h2">
                Datos Cliente
              </Typography>

              <Typography variant="subtitle1">
                <strong>Nombre:</strong> {cliente?.nombre}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {cliente?.email}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Teléfono:</strong> {cliente?.telefono}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Dirección:</strong> {cliente?.direccion}
              </Typography>
              <Typography variant="subtitle1">
                <strong>DNI:</strong> {cliente?.dni}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography mb={2} variant="h6" component="h2">
                Datos Dispositivo
              </Typography>
              {Object.entries(dispositivo).map(([key, value]) => (
                <Typography variant="body1" key={key}>
                  <strong>{key}: </strong>
                  {value}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
