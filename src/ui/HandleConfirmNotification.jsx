import { Button, Stack } from "@mui/material";
import { closeSnackbar } from "notistack";

export default function HandleConfirmNotification({ id, snackbarId, fetch }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        sx={{ textTransform: "none" }}
        size="small"
        variant="contained"
        onClick={() => fetch(id, snackbarId)}
        color="primary"
      >
        Confirmar
      </Button>
      <Button
        sx={{ textTransform: "none" }}
        variant="contained"
        color="error"
        size="small"
        onClick={() => closeSnackbar(snackbarId)}
      >
        Cancelar
      </Button>
    </Stack>
  );
}
