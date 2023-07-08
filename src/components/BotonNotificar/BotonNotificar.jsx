import React, { useState, useRef } from "react";
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

const options = ["Avisar Whatsapp", "Avisar Email"];

const BotonNotificar = ({ cliente }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { user } = useUserContext();

  const handleClick = () => {
    if (selectedIndex == 0) {
      notificarPorWhatsApp();
    } else {
      notificarPorEmail();
    }
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

  const generarMensaje = (email) => {
    const enlace = `${import.meta.env.VITE_URL}order-status/${cliente.uuid}`;
    const {
      cliente: clienteName,
      estado,
      marca,
      modelo,
      imei,
      color,
      averiaDetectadaSat,
      descripcionDetectadaSat,
      observacionesDetectadasSat,
      tipoGarantia,
      precio,
    } = cliente;

    return !email
      ? `¡Hola *${clienteName}*!

    Su reparación ha cambiado de estado a: *${estado}*.
    *Datos del terminal:* ${marca}, ${modelo}, ${imei}, color: ${color}.
    *Averia principal:* ${averiaDetectadaSat}.
    *Descripcion:* ${descripcionDetectadaSat}.
    *Observaciones:* ${observacionesDetectadasSat || ""}.
    *Resolucion:* ${tipoGarantia}.
    *Precio: ${precio}.*
    
    Puede realizar un seguimiento a su reparacion en el *siguiente enlace:*
    ${enlace}

    ${
      estado == "Reparacion Finaliazada"
        ? "Su terminal está disponible para recogida en:"
        : ""
    }

    Un saludo desde *${user.negocio.nombre}*
    *Direccion:* ${user.negocio.direccion}.
    *Telefono:* ${user.negocio.telefono}.
    `
      : `¡Hola ${clienteName}!

      Su reparación ha cambiado de estado a: ${estado}.
      Datos del terminal: ${marca}, ${modelo}, ${imei}, color: ${color}.
      Averia principal: ${averiaDetectadaSat}.
      Descripcion: ${descripcionDetectadaSat}.
      Observaciones: ${observacionesDetectadasSat || ""}.
      Resolucion: ${tipoGarantia}.
      Precio: ${precio}.

      Puede realizar un seguimiento a su reparacion en el siguiente enlace:
      ${enlace}
      
      ${
        estado == "Reparacion Finaliazada"
          ? "Su terminal está disponible para recogida en:"
          : ""
      }
      
      

      Un saludo desde ${user.negocio.nombre}
      Direccion: ${user.negocio.direccion}.
      Telefono: ${user.negocio.telefono}.
      `;
  };

  const notificarPorWhatsApp = () => {
    const telefono = encodeURIComponent(`+34${cliente.telefono}`);
    const mensaje = encodeURIComponent(generarMensaje());
    const enlace = `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

    enqueueSnackbar("Abriendo WhatsApp", {
      variant: "success",
    });
    window.open(enlace);
  };

  const notificarPorEmail = () => {
    console.log(cliente?.estado);
    const email = encodeURIComponent(cliente.email);
    const asunto = encodeURIComponent(
      `${user.negocio.nombre} - ${cliente.estado}`
    );
    const cuerpo = encodeURIComponent(generarMensaje(true));
    const url = `mailto:${email}?subject=${asunto}&body=${cuerpo}&content-type=text/html`;

    enqueueSnackbar("Abriendo Email", {
      variant: "success",
    });
    window.open(url);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          onClick={handleClick}
          startIcon={selectedIndex === 0 ? <WhatsAppIcon /> : <EmailIcon />}
          sx={{ textTransform: "none", fontSize: "16px" }}
          color={selectedIndex === 0 ? "success" : "warning"}
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
          color={selectedIndex === 0 ? "success" : "warning"}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 2],
            },
          },
          {
            name: "preventOverflow",
            options: {
              padding: 0,
            },
          },
          {
            name: "flip",
            options: {
              padding: 0,
            },
          },
        ]}
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
    </>
  );
};

export default BotonNotificar;
