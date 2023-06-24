import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Modal,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  py: 4,
  px: 2,
};

const steps = [
  { label: "Productos" },
  { label: "Tarjetas" },
  { label: "Cupones" },
  { label: "Resumen" },
];

const planOptions = [
  {
    label: "Básico Mensual",
    description: "Tu plan se renovará automáticamente cada mes",
    price: "19.99€/mes",
  },
  {
    label: "Básico Anual",
    description: "Un solo pago cada año",
    price: "179.99€/año",
  },
];
const initialCardData = {
  cardNumber: "",
  cardType: "",
  cardYear: "",
  cardMonth: "",
  cardName: "",
};

const SuscripcionModal = ({ modalAbierto, closeModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userPlan, setUserPlan] = useState({});
  const [cardData, setCardData] = useState(initialCardData);
  const [couponData, setCouponData] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setUserPlan("");
    setCardData({});
    setCouponData({});
    closeModal();
  };

  const handlePlanSelect = (plan) => {
    setUserPlan(plan);
  };

  const handleCardChange = (e) => {
    setCardData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCouponChange = (e) => {
    setCouponData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = () => {
    handleNext();
    setLoading(true);

    // Simular proceso de carga
    setTimeout(() => {
      setLoading(false);
      setPaymentComplete(true);

      // Cerrar el modal después de un breve retraso
      setTimeout(() => {}, 1500);
      enqueueSnackbar("Pago realizado", { variant: "success" });
    }, 2000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" color={"initial"} mb={1}>
              Por favor, selecciona un plan:
            </Typography>
            <Box sx={{ mb: 1 }}>
              {planOptions.map((option) => (
                <Button
                  key={option.label}
                  variant={
                    userPlan.label === option.label ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={() => handlePlanSelect(option)}
                  sx={{
                    color:
                      userPlan.label === option.label ? "white" : "grey.800",
                    flexDirection: "column",
                    width: "100%",
                    my: 1,
                    alignItems: "start",
                    textTransform: "none",
                    border: "1px solid #C1C1C1",
                  }}
                >
                  <Typography component={"div"} variant="h6">
                    {option.label}
                  </Typography>
                  <Typography component={"div"} variant="body1">
                    {option.description}
                  </Typography>
                  <Typography sx={{ ml: 35 }} component={"div"} variant="h6">
                    {option.price}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="body1" mb={1}>
              Agrega una tarjeta de crédito
            </Typography>
            <Typography variant="body2">Tarjeta:</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                label="Nombre del titular"
                name="cardName"
                size="small"
                onChange={handleCardChange}
                value={cardData.cardName || ""}
                sx={{ mb: 2, bgcolor: "grey.100" }}
              />
              <TextField
                label="Número de tarjeta"
                name="cardNumber"
                size="small"
                onChange={handleCardChange}
                value={cardData.cardNumber || ""}
                sx={{ mb: 2, bgcolor: "grey.100" }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="MM"
                  name="cardMonth"
                  size="small"
                  onChange={handleCardChange}
                  value={cardData.cardMonth || ""}
                  sx={{ mb: 2, bgcolor: "grey.100" }}
                />
                <TextField
                  label="AA"
                  name="cardYear"
                  size="small"
                  onChange={handleCardChange}
                  value={cardData.cardYear || ""}
                  sx={{ mb: 2, bgcolor: "grey.100" }}
                />
                <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="tarjeta-credito-label">
                    Tarjeta de crédito
                  </InputLabel>
                  <Select
                    name="cardType"
                    labelId="tarjeta-credito-label"
                    id="tarjeta-credito-select"
                    value={cardData.cardType}
                    onChange={handleCardChange}
                    size="small"
                    label="Tarjeta de crédito"
                  >
                    <MenuItem defaultValue={"Visa"} value="VISA">
                      Visa
                    </MenuItem>
                    <MenuItem value="MASTERCARD">Mastercard</MenuItem>
                    <MenuItem value="AMEX">American Express</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography mb={1} variant="body1">
              Agregar cupón de descuento:
            </Typography>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <TextField
                label="Código de cupón"
                name="couponCode"
                onChange={handleCouponChange}
                value={couponData.couponCode || ""}
                size="small"
              />
            </FormControl>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6">Resumen de la suscripción:</Typography>
            <Box border={1} mx={2} p={2} mt={2}>
              <Typography variant="body1">
                Plan seleccionado: {userPlan.label}
              </Typography>
              <Typography variant="body1">
                Precio de la suscripción: {userPlan.price}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography mb={2} variant="h6">
                Tarjeta de Crédito:
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "4px",
                  backgroundColor: "#1565C0",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "400px",
                  margin: "0 auto",
                  position: "relative",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "#ccc",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      marginBottom: "8px",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                    }}
                    variant="body2"
                  >
                    {cardData.type}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      marginBottom: "8px",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                    }}
                    color={"#ccc"}
                    variant="body1"
                  >
                    {cardData.cardName}
                  </Typography>
                  <Typography
                    color={"#ccc"}
                    variant="body1"
                    sx={{
                      marginBottom: "8px",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                    }}
                  >{`${cardData.cardYear}/${cardData.cardMonth}`}</Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    marginBottom: "8px",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                  }}
                  color={"#ccc"}
                  variant="body1"
                >
                  {cardData.cardNumber
                    ? cardData.cardNumber.replace(/\d(?=\d{4})/g, "*")
                    : "**** **** **** ****"}
                </Typography>
                <Typography color={"#ccc"} variant="body1">
                  {cardData.cardType}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1">
              {couponData?.couponCode &&
                `Cupón de descuento seleccionado: ${couponData.couponCode}`}
            </Typography>
          </Box>
        );
      case 4:
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6" color="initial" mb={2}>
                  ¡Pago confirmado! Has completado la suscripción con éxito.
                </Typography>
              </>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={modalAbierto}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
          Selección de planes
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={1}
          sx={{ p: 2, border: "1px solid #C4C4C4", mt: 2, width: "100%" }}
        >
          <Box sx={{ mb: 2 }}>{renderStepContent(activeStep)}</Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {activeStep === 4 ? (
              ""
            ) : (
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ textTransform: "none", mt: 1 }}
              >
                Volver
              </Button>
            )}

            <Box>
              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none", mt: 1 }}
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none", mt: 1 }}
                  onClick={handlePayment}
                >
                  Pagar
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {activeStep === steps.length && (
          <Box sx={{ mt: 2 }}>
            {loading ? (
              ""
            ) : (
              <Typography variant="body1">¡Suscripción completada!</Typography>
            )}
            <Button variant="outlined" onClick={handleReset} sx={{ mt: 2 }}>
              Terminar
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SuscripcionModal;
