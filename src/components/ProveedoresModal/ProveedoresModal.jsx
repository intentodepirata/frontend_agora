import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import {
  Box,
  Paper,
  Typography,
  Button,
  Modal,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,

  bgcolor: "background.paper",
  // border: "1px solid grey",
  borderRadius: 1,
  boxShadow: 24,
  p: 5,
};

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
          {proveedores.map((proveedor) => (
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
