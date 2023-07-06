import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { ListItemIcon } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "../../contexts/UserContext";

const options = ["Whatsapp  ", "Email"];

export default function BotonNotificar({ cliente }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { user } = useUserContext();

  const handleClick = () => {
    options[selectedIndex] === "Whatsapp"
      ? notificarPorWhatsApp()
      : notificarPorEmail();
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const generarMensaje = () => {
    return `¡Hola ${cliente.cliente}!
      Su reparacion ha cambiado de estado a: ${cliente.estado}.
      Datos del terminal: Marca: ${cliente.marca}, ${cliente.modelo}, ${
      cliente.imei
    }, ${cliente.color}.
      Averia principal: ${cliente.averiaDetectadaSat}.
      Descripcion: ${cliente.descripcionDetectadaSat}.
      Observaciones: ${cliente.observacionesDetectadasSat || ""}.
      Resolucion: ${cliente.tipoGarantia}.
      Precio: ${cliente.precio}.

Su terminal está disponible para recogida en:
    Direccion: ${user.negocio.direccion}.
    Telefono: ${user.negocio.telefono}.
    
Un saludo desde ${user.negocio.nombre},
    `;
  };
  const notificarPorWhatsApp = () => {
    const telefono = encodeURIComponent(`+34${cliente.telefono}`);
    const mensaje = encodeURIComponent(generarMensaje());
    const enlace = `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

    window.open(enlace, "_blank");

    enqueueSnackbar("Cliente notificado por WhatsApp", {
      variant: "success",
      persist: true,
    });
  };
  const notificarPorEmail = () => {
    const email = encodeURIComponent(cliente.email);
    const asunto = encodeURIComponent(
      `${user.negocio.nombre} - ${cliente.estado}`
    );
    const cuerpo = encodeURIComponent(generarMensaje());
    const url = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
    // window.location.href = url;
    window.open(url, "_blank");

    enqueueSnackbar("Cliente notificado por Email", {
      variant: "success",
      persist: true,
    });
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          onClick={handleClick}
          startIcon={selectedIndex === 0 ? <WhatsAppIcon /> : <EmailIcon />}
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="Notificar-boton-cliente"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      <ListItemIcon>
                        {index === 0 ? (
                          <WhatsAppIcon />
                        ) : index === 1 ? (
                          <EmailIcon />
                        ) : (
                          <WhatsAppIcon />
                        )}
                      </ListItemIcon>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
