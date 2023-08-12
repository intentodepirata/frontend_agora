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
import { useUserContext } from "../../contexts/UserContext";
const ChatBox = () => {
  const [openModal, setOpenModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [shake, setShake] = useState(false);
  const [emailInvitado, setEmailInvitado] = useState("");
  const horaActual = new Date().getHours();
  const onlineTime = horaActual >= 10 && horaActual <= 18;
  const { user } = useUserContext();
  const handleModal = async () => {
    if (openModal && mensaje !== "") {
      const url = `${import.meta.env.VITE_API_URL}mensajes`;

      //Por si se usa desde el landing, necesitaremos tambien un email
      if (emailInvitado === "" && !user) {
        enqueueSnackbar("Escribe tu email", { variant: "error" });
        setOpenModal((value) => !value);
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mensaje,
            email: user ? user.email : emailInvitado,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          enqueueSnackbar("Error al enviar el mensaje", { variant: "error" });
          throw new Error(data.message);
        }

        setMensaje("");
        setEmailInvitado("");
        enqueueSnackbar("Mensaje enviado correctamente", {
          variant: "success",
        });
      } catch (error) {
        console.error(error.message);
      }
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
            bottom: 40,
            right: 20,
            padding: 4,
          }}
        >
          {openModal ? (
            <SendIcon fontSize="medium" />
          ) : (
            <>
              {hovered ? (
                <EditIcon fontSize="medium" />
              ) : (
                <ChatIcon fontSize="medium" />
              )}
            </>
          )}
        </Fab>
      </Zoom>
      <Modal
        open={openModal}
        onClose={handleModal}
        sx={{ zIndex: 4, backdropFilter: "0" }}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        <Fade in={openModal} timeout={200}>
          <Box
            bgcolor={"primary.main"}
            sx={{
              position: "absolute",
              bottom: 20,
              right: { xs: 14, sm: 40 },
              padding: 3,
              width: 362,
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
                  mb: 2,
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
                <Avatar sx={{ width: 70, height: 70 }} />
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
              {!user && (
                <Input
                  id="emailInvitado"
                  placeholder="Introduce tu email"
                  value={emailInvitado}
                  onChange={(e) => setEmailInvitado(e.target.value)}
                />
              )}
              <Input
                sx={{ mt: 2 }}
                id="chatbox"
                placeholder="Introduce tu mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChatBox;
