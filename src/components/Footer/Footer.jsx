import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <Typography
      sx={{ mt: 10, textAlign: "center", mb: 2 }}
      variant="body2"
      color="initial"
    >
      Agora &copy;. Todos los derechos reservados {new Date().getFullYear()}{" "}
    </Typography>
  );
}
