import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/outfit/";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import "./main.css";

const theme = createTheme({
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
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
