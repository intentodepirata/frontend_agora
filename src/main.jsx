import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, IconButton } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/outfit/";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import "./main.css";
import {
  SnackbarProvider,
  closeSnackbar,
  MaterialDesignContent,
} from "notistack";
import styled from "@emotion/styled";

import DeleteIcon from "@mui/icons-material/Delete";

const myRef = createRef();
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
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    padding: "12px 14px 12px 14px",
  },
  "&.notistack-MuiContent-error": {
    padding: "12px 14px 12px 14px",
  },
  "&.notistack-MuiContent-info": {
    padding: "12px 14px 12px 14px",
  },
  "&.notistack-MuiContent-warning": {
    padding: "12px 14px 12px 14px",
  },
  "&.notistack-MuiContent-default": {
    padding: "12px 14px 12px 14px",
  },
}));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            info: StyledMaterialDesignContent,
            warning: StyledMaterialDesignContent,
            default: StyledMaterialDesignContent,
          }}
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3500}
          classes={{
            containerRoot: "notification-container",
          }}
          ref={myRef}
          action={(snackbarId) => (
            <IconButton
              aria-label="delete"
              sx={{ color: "white" }}
              size="small"
              onClick={() => closeSnackbar(snackbarId)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
