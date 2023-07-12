import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.js";
import { NotificationProvider } from "./ui/NotificationProvider.jsx";
import "./main.css";
import "@fontsource/outfit/";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NotificationProvider>
          <CssBaseline />
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
