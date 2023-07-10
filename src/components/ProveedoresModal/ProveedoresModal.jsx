import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import {
  Box,
  Typography,
  Button,
  Modal,
  Stack,
  List,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { style } from "./style/style";

const ProveedoresModal = ({
  modalAbierto,
  proveedores,
  proveedorSeleccionado,
  seleccionarProveedor,
  solicitarPorWhatsApp,
  solicitarPorEmail,
  closeModal,
}) => {
  return (
    <Modal
      open={modalAbierto}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          color={"grey"}
          fontWeight={"bold"}
          textAlign={"center"}
          variant="h5"
          sx={{ mb: 2 }}
        >
          Selecciona un proveedor
        </Typography>

        <List sx={{ width: "100%" }}>
          {proveedores &&
            proveedores.map((proveedor) => (
              <Box key={proveedor.id}>
                <ListItemButton
                  button
                  selected={proveedor === proveedorSeleccionado}
                  onClick={() => seleccionarProveedor(proveedor)}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="GrayText">
                        {proveedor.empresa}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          fontWeight="bold"
                        >
                          Teléfono:
                        </Typography>{" "}
                        {proveedor.telefono}
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          fontWeight="bold"
                        >
                          Email:
                        </Typography>{" "}
                        {proveedor.email}
                      </>
                    }
                  />
                </ListItemButton>
                {proveedores.length > 1 && <Divider />}
              </Box>
            ))}
        </List>
        {proveedorSeleccionado && (
          <Stack
            sx={{ mt: 2, justifyContent: "center" }}
            direction={"row"}
            spacing={2}
            a
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => solicitarPorWhatsApp(proveedorSeleccionado)}
              endIcon={<WhatsAppIcon />}
            >
              WhatsApp
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(proveedorSeleccionado.web, "_blank")}
              endIcon={<PublicIcon />}
            >
              Web
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => solicitarPorEmail(proveedorSeleccionado)}
              endIcon={<EmailIcon />}
            >
              Email
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default ProveedoresModal;
