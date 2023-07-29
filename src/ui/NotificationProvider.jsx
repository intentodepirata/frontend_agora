import { StyledMaterialDesignContent } from "./StyledMaterialDesignContent";
import { IconButton, Typography } from "@mui/material";
import { SnackbarProvider, closeSnackbar } from "notistack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { createRef } from "react";
export const NotificationProvider = ({ children }) => {
  const myRef = createRef();
  return (
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
      disableWindowBlurListener={true}
      ref={myRef}
      action={(snackbarId) => (
        <IconButton
          aria-label="delete"
          sx={{ color: "white" }}
          size="small"
          onClick={() => closeSnackbar(snackbarId)}
        >
          <Typography mr={1} variant="caption" color="inherit">
            Cerrar
          </Typography>
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
