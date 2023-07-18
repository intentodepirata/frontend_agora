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
import {
  notificarPorEmail,
  notificarPorWhatsApp,
  options,
} from "./utils/generarMensaje";
import { useUserContext } from "../../contexts/UserContext";

const BotonNotificar = ({ cliente }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUserContext();

  const handleClick = () => {
    if (selectedIndex == 0) {
      notificarPorWhatsApp(cliente, user);
    } else {
      notificarPorEmail(cliente, user);
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
