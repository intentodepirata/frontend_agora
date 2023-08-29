import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, TextField } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { style } from "./style/style";

export default function ModalCierreCaja({
  modal,
  handleModal,
  totalGastos,
  totalIngresos,
  registroDiario,
  setRegistroDiario,
  handleConfirmarCaja,
  cajaCerrada,
}) {
  const handleChange = (e) => {
    setRegistroDiario({
      ...registroDiario,
      [e.target.name]: e.target.value,
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
              name="gastoFinal"
              value={registroDiario.gastoFinal}
              type="number"
              onChange={handleChange}
              size="small"
            />
            <TextField
              id="ingresoFinal"
              label="Total de ingresos"
              name="ingresoFinal"
              value={registroDiario.ingresoFinal}
              type="number"
              onChange={handleChange}
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontSize: "16px" }}
            endIcon={<LockOpenIcon />}
            onClick={handleConfirmarCaja}
            disabled={cajaCerrada}
            fullWidth
          >
            Realizar el cierre de caja
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
