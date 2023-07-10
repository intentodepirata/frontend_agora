import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useScrollUp from "../hooks/useScrollUp";
import FormTesoreria from "../components/FormTesoreria/FormTesoreria";
import ModalCierreCaja from "../components/ModalCierreCaja/ModalCierreCaja";
import { useUserContext } from "../contexts/UserContext";

export default function Treasury() {
  const [modal, setModal] = useState(false);
  const [totalGastos, setTotalGastos] = useState(
    JSON.parse(localStorage.getItem("totalGastos")) || []
  );
  const [totalIngresos, setTotalIngresos] = useState(
    JSON.parse(localStorage.getItem("totalIngresos")) || []
  );
  const [estadoCaja, setEstadoCaja] = useState(false);

  useEffect(() => {
    localStorage.setItem("totalIngresos", JSON.stringify(totalIngresos));
    localStorage.setItem("totalGastos", JSON.stringify(totalGastos));
  }, [totalGastos, totalIngresos]);

  const handleModal = () => {
    setModal((value) => !value);
  };

  const { user } = useUserContext();
  useScrollUp();

  useEffect(() => {
    fetchComprobarEstadoCaja();
  }, []);
  const fetchComprobarEstadoCaja = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}tesoreria/status`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      setEstadoCaja(true);
    } catch (error) {
      console.log(error);
    }
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
        estadoCaja={estadoCaja}
      />
    </Box>
  );
}
