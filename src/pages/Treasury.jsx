import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useScrollUp from "../hooks/useScrollUp";
import FormTesoreria from "../components/FormTesoreria/FormTesoreria";
import ModalCierreCaja from "../components/ModalCierreCaja/ModalCierreCaja";
import { useUserContext } from "../contexts/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatus, postStatus } from "../api/treasury";
import { enqueueSnackbar } from "notistack";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";
import { initialValues } from "../components/ModalCierreCaja/utils/initialValues";

export default function Treasury() {
  const [registroDiario, setRegistroDiario] = useState(initialValues);
  const [modal, setModal] = useState(false);
  const [totalGastos, setTotalGastos] = useState(
    JSON.parse(localStorage.getItem("totalGastos")) || []
  );
  const [totalIngresos, setTotalIngresos] = useState(
    JSON.parse(localStorage.getItem("totalIngresos")) || []
  );
  const [estadoCaja, setEstadoCaja] = useState(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    localStorage.setItem("totalIngresos", JSON.stringify(totalIngresos));
    localStorage.setItem("totalGastos", JSON.stringify(totalGastos));
  }, [totalGastos, totalIngresos]);

  const handleModal = () => {
    setModal((value) => !value);
  };

  const { user } = useUserContext();
  useScrollUp();

  const queryTreasuryStatus = useQuery({
    queryKey: ["queryTreasuryStatus"],
    queryFn: () => getStatus(user.token),
    onSuccess: (data) => setEstadoCaja(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: () =>
      postStatus(
        {
          ...registroDiario,
        },
        user.token
      ),
    onSuccess: () => {
      enqueueSnackbar("Caja cerrada correctamente", {
        variant: "success",
      });
      localStorage.removeItem("totalGastos");
      localStorage.removeItem("totalIngresos");
      handleModal();
      queryClient.invalidateQueries(["queryTreasuryStatus"]);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const handleConfirmarCaja = (id) => {
    if (
      registroDiario.gastoFinal === "" ||
      registroDiario.ingresoFinal === ""
    ) {
      enqueueSnackbar("Complete todos los campos", {
        variant: "error",
      });
      return;
    }
    enqueueSnackbar("Desear hacer el cierre de caja para hoy?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={createMutation}
        />
      ),
    });
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="initial"
            sx={{ ml: 2, p: 2 }}
          >
            Tesoreria
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          endIcon={<LockOpenIcon />}
          onClick={handleModal}
          disabled={!estadoCaja}
        >
          {estadoCaja ? "Abrir caja" : "Caja Cerrada"}
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <FormTesoreria
          setTotalGastos={setTotalGastos}
          setTotalIngresos={setTotalIngresos}
          estadoCaja={estadoCaja}
        />
      </Box>
      <ModalCierreCaja
        modal={modal}
        handleModal={handleModal}
        totalGastos={totalGastos}
        totalIngresos={totalIngresos}
        registroDiario={registroDiario}
        setRegistroDiario={setRegistroDiario}
        handleConfirmarCaja={handleConfirmarCaja}
        estadoCaja={estadoCaja}
      />
    </Box>
  );
}
