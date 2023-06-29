import { useEffect, useState } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Fab,
  Modal,
  Typography,
  Zoom,
  IconButton,
  Stack,
  Avatar,
  Input,
  Fade,
} from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { shakeAnimation } from "./utils/shakeAnimation";
const ChatBox = () => {
  const [openModal, setOpenModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [shake, setShake] = useState(false);
  const horaActual = new Date().getHours();
  const onlineTime = horaActual >= 10 && horaActual <= 18;

  const handleModal = () => {
    if (openModal && mensaje !== "") {
      setMensaje("");
      enqueueSnackbar("Mensaje enviado correctamente", { variant: "success" });
    }
    setShake(true);
    setOpenModal((value) => !value);
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
    }, 4500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Zoom
        in={true}
        style={{
          transitionDelay: `50ms`,
        }}
        timeout={{ enter: 0, exit: 50 }}
        unmountOnExit
      >
        <Fab
          aria-label="Add"
          color={hovered ? "secundary" : "primary"}
          onClick={handleModal}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverLeave}
          sx={{
            position: "fixed",
            bottom: 50,
            right: 50,
            padding: 4,
          }}
        >
          {openModal ? (
            <SendIcon fontSize="large" />
          ) : (
            <>
              {hovered ? (
                <EditIcon fontSize="large" />
              ) : (
                <ChatIcon fontSize="large" />
              )}
            </>
          )}
        </Fab>
      </Zoom>
      <Modal
        open={openModal}
        onClose={handleModal}
        sx={{ zIndex: 0, backdropFilter: "0" }}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        {/* <Slide direction="left" in={openModal} mountOnEnter unmountOnExit> */}
        {/* <Grow in={openModal} timeout={200} mountOnEnter unmountOnExit> */}
        <Fade in={openModal} timeout={200}>
          <Box
            bgcolor={"primary.main"}
            sx={{
              position: "fixed",
              bottom: 30,
              right: 70,
              padding: 3,
              width: 400,
              borderRadius: 4,
              backgroundImage: "url('/img/background-landpage.svg')",
              backgroundPosition: "80%",
              backgroundOrigin: "content-box",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              overflow: "hidden",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Contenido del modal */}
            <Box width={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Typography variant="h3" color={"white"}>
                  ¡Hola!
                </Typography>

                <Typography
                  sx={{
                    transform: "rotate(-20deg)",
                    animation: shake ? `${shakeAnimation} 0.5s` : "none",
                  }}
                  variant="h3"
                  color={"white"}
                >
                  👋
                </Typography>

                <Stack direction="row">
                  <IconButton>
                    <MoreVertIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton onClick={() => setOpenModal(false)}>
                    <KeyboardArrowDownIcon
                      fontSize="large"
                      sx={{ color: "white" }}
                    />
                  </IconButton>
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  my: 1,
                  px: 2,
                  gap: 2,
                }}
              >
                <Typography color={"white"} component={"p"} fontSize={"1.1rem"}>
                  Bienvenido a Agora ¿Como podemos ayudarte? 🥸
                </Typography>
                <Avatar sx={{ width: 80, height: 80 }} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  background: onlineTime ? "rgb(88, 183, 67)" : "red",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="subtitle1" fontSize="1.1rem" color="white">
                {onlineTime
                  ? "Contestamos inmediatamente"
                  : "Contestaremos en horario de 10 a 18"}
              </Typography>
            </Box>
            <Box sx={{ px: 2, mt: 8 }}>
              <Input
                id="chatbox"
                placeholder="Introduce tu mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </Box>
          </Box>
        </Fade>
        {/* </Grow> */}
        {/* </Slide> */}
      </Modal>
    </div>
  );
};

export default ChatBox;
