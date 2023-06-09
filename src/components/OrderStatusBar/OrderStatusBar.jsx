import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Introduzca datos del cliente",
  "Introduzca datos del terminal",
  "Recepcionado",
  "Asignado a tecnico",
  "En reparacion",
  "Pendiente de repuesto",
  "Reparacion Finalizada",
];

export default function OrderStatusBar({ estado }) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    setActiveStep(estado);
  }, [estado]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
