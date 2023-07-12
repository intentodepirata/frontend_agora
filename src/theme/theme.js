import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["outfit", "-apple-system"].join(","),
  },
  palette: {
    type: "light",
    primary: {
      main: "#0150F5",
    },
    secondary: {
      main: "#F3F4F6",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560,
      xxxl: 3840,
    },
  },
});
