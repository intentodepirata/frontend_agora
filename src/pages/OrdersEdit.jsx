import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useParams } from "react-router-dom";
import FormOperacionesTecnicas from "../components/FormOperacionesTecnicas/FormOperacionesTecnicas";
import useScrollUp from "../hooks/useScrollUp";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import DatosOrdenModal from "../components/DatosOrdenModal/DatosOrdenModal";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useUserContext } from "../contexts/UserContext";
import BotonNotificar from "../components/BotonNotificar/BotonNotificar";
const OrdersEdit = () => {
  const [fetchData, setFetchData] = useState(false);
  const [modal, setModal] = useState(false);
  const [entregada, setEntregada] = useState(false);
  const [cliente, setCliente] = useState(null);
  const { id } = useParams();
  const { user } = useUserContext();
  useScrollUp();

  useEffect(() => {
    fetchCliente();
    fetchIsEntregada();
  }, [id]);

  const fetchCliente = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/print/${id}`,
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

  const fetchIsEntregada = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}ot/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (data.entregada === 1) {
        setEntregada(true);
      }
    } catch (error) {
      console.error("Error al entregar la Orden:");
    }
  };

  const fetchEntregar = async (snackbarId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/deliver/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (!data) {
        throw new Error("Error al entregar la Orden");
      }

      setEntregada(true);
      closeSnackbar(snackbarId);
      enqueueSnackbar("Orden entregada correctamente", {
        variant: "success",
      });
    } catch (error) {
      closeSnackbar(snackbarId);
      console.error("Error al entregar la Orden:");
    }
  };
  const handleEntregar = () => {
    enqueueSnackbar("Desear entregar el terminal al Cliente?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => fetchEntregar(snackbarId)}
            color="primary"
          >
            Confirmar
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Cancelar
          </Button>
        </Stack>
      ),
    });
  };
  const handleButtonClick = () => {
    setFetchData(true);
  };
  function handlePrint() {
    // navigate("/print/" + id[0]);
    window.open(`/print/${id}`, "_blank");
  }
  const handleModal = () => {
    setModal((value) => !value);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/home/orders" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Editar Orden
          </Typography>
        </Box>
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
          spacing={2}
        >
          <Button
            onClick={() => handleModal()}
            variant="contained"
            endIcon={<PlagiarismIcon />}
            color="warning"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Datos
          </Button>

          <BotonNotificar cliente={cliente} />

          {!entregada && (
            <Button
              onClick={() => handleEntregar()}
              variant="contained"
              endIcon={<DoneAllRoundedIcon />}
              color="success"
              sx={{ textTransform: "none", fontSize: "16px" }}
              disabled={entregada}
            >
              Entregar
            </Button>
          )}
          <Button
            onClick={() => handlePrint()}
            variant="contained"
            endIcon={<PrintIcon />}
            color="success"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Imprimir
          </Button>
          <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontSize: "16px" }}
          >
            Guardar Orden
          </Button>
        </Stack>
      </Box>
      {modal && (
        <DatosOrdenModal modal={modal} handleModal={handleModal} id={id} />
      )}

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormOperacionesTecnicas
          fetchData={fetchData}
          setFetchData={setFetchData}
          entregada={entregada}
        />
      </Box>
    </Box>
  );
};

export default OrdersEdit;
