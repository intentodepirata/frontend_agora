import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <Typography textAlign={"center"} variant="body2" color="initial">
      Ágora TechSolutions &copy;. Todos los derechos reservados{" "}
      {new Date().getFullYear()}{" "}
    </Typography>
  );
}
