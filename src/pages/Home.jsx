import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TablaHome from "../components/TablaHome/TablaHome";
import MainWidget from "../components/MainWidget/MainWidget";
import { useUserContext } from "../contexts/UserContext";
import { enqueueSnackbar } from "notistack";
import useScrollUp from "../hooks/useScrollUp";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [opcionesFiltro, setOpcionesFiltro] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [totalFacturado, setTotalFacturado] = useState(0);
  const { user } = useUserContext();

  useScrollUp();

  useEffect(() => {
    const opcionesFiltro = {
      items: [
        {
          field: "estado",
          operator: "contains",
          value: filtroEstado,
        },
      ],
    };
    setOpcionesFiltro(opcionesFiltro);
  }, [filtroEstado]);

  useEffect(() => {
    fetchOtsByTime("mes");
  }, []);
  const fetchOtsByTime = async (time) => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/time/${time}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const responseFacturado = await fetch(
        `${import.meta.env.VITE_API_URL}ot/total-price/${time}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const dataFacturado = await responseFacturado.json();
      const data = await response.json();

      if (data.length === 0) {
        enqueueSnackbar(`No hay ots en la vista por ${time}`, {
          variant: "info",
        });
      }

      setRows(data);
      setTotalFacturado(dataFacturado);
      setCargando(false);
    } catch (error) {
      console.error(`Error al obtener las ots de ${time}:`, error);
    }
  };

  return (
    <>
      <MainWidget
        rows={rows}
        fetchOtsByTime={fetchOtsByTime}
        setFiltroEstado={setFiltroEstado}
        filtroEstado={filtroEstado}
        totalFacturado={totalFacturado}
      />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaHome
          rows={rows}
          cargando={cargando}
          opcionesFiltro={opcionesFiltro}
        />
      </Box>
    </>
  );
};

export default Home;
