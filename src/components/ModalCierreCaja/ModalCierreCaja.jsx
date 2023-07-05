import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Button, Divider, Stack, TextField } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  border: " 1px solid grey",
  py: 4,
  px: 4,
};
export default function ModalCierreCaja({
  modal,
  handleModal,
  totalGastos,
  totalIngresos,
  estadoCaja,
}) {
  const [gastoFinal, setGastoFinal] = useState("");
  const [ingresoFinal, setIngresoFinal] = useState("");
  const { user } = useUserContext();
  const navigate = useNavigate();
  const handleCierreCaja = async (snackbarId) => {
    closeSnackbar(snackbarId);
    if (gastoFinal === "" || ingresoFinal === "") {
      enqueueSnackbar("Complete todos los campos", {
        variant: "error",
      });
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}tesoreria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({
          gastoFinal,
          ingresoFinal,
        }),
      });

      if (!response.ok) {
        enqueueSnackbar("Solo puede cerrar una caja al dia", {
          variant: "error",
        });
        throw new Error("Error al cerrar la caja");
      }

      enqueueSnackbar("Caja cerrada correctamente", {
        variant: "success",
      });
      setGastoFinal("");
      setIngresoFinal("");
      localStorage.removeItem("totalGastos");
      localStorage.removeItem("totalIngresos");
      handleModal();
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleConfirmarCaja = () => {
    enqueueSnackbar("Desear hacer el cierre de caja para hoy?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => handleCierreCaja(snackbarId)}
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
                height: "300px",
                overflowY: "scroll",
              }}
            >
              <Typography
                textAlign={"center"}
                mb={2}
                variant="h6"
                component="h2"
              >
                Gastos
              </Typography>

              {totalGastos.map((item, index) => (
                <Typography
                  textAlign={"center"}
                  key={index}
                  variant="body1"
                  color="initial"
                >
                  {item}
                </Typography>
              ))}
              <Divider />
              <Typography
                fontWeight={"bold"}
                textAlign={"center"}
                variant="body1"
                color="initial"
                mt={2}
              >
                {totalGastos.reduce(
                  (accumulator, currentValue) =>
                    accumulator + parseInt(currentValue, 10),
                  0
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "300px",
                overflowY: "scroll",
              }}
            >
              <Typography
                textAlign={"center"}
                mb={2}
                variant="h6"
                component="h2"
              >
                Ingresos
              </Typography>

              {totalIngresos.map((item, index) => (
                <Typography
                  textAlign={"center"}
                  key={index}
                  variant="body1"
                  color="initial"
                >
                  {item}
                </Typography>
              ))}
              <Divider />
              <Typography
                fontWeight={"bold"}
                textAlign={"center"}
                variant="body1"
                color="initial"
                mt={2}
              >
                {totalIngresos.reduce(
                  (accumulator, currentValue) =>
                    accumulator + parseInt(currentValue, 10),
                  0
                )}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 4 }}
            my={2}
          >
            <TextField
              id="gastoFinal"
              label="Total de gastos"
              value={gastoFinal}
              type="number"
              onChange={(e) => setGastoFinal(e.target.value)}
              size="small"
            />
            <TextField
              id="ingresoFinal"
              label="Total de ingresos"
              value={ingresoFinal}
              type="number"
              onChange={(e) => setIngresoFinal(e.target.value)}
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontSize: "16px" }}
            endIcon={<LockOpenIcon />}
            onClick={handleConfirmarCaja}
            disabled={!estadoCaja}
            fullWidth
          >
            Cerrar caja
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
