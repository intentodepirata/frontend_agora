import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TablaHome from "../components/TablaHome/TablaHome";
import MainWidget from "../components/MainWidget/MainWidget";
import { useUserContext } from "../contexts/UserContext";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [opcionesFiltro, setOpcionesFiltro] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");

  const { user } = useUserContext();

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
    const fetchOts = async () => {
      try {
        setCargando(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}ot/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        setRows(data);

        setCargando(false);
      } catch (error) {
        console.error("Error al obtener las ots:", error);
      }
    };
    fetchOts();
  }, []);

  const fetchOtsDay = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/time/dia`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (data.length === 0) {
        alert("No hay ots en el día");
        setCargando(false);

        return;
      }
      setRows(data);

      setCargando(false);
    } catch (error) {
      console.error("Error al obtener las ots:", error);
    }
  };
  const fetchOtsWeek = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/time/semana`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (data.length === 0) {
        alert("No hay ots en esta semana");
        setCargando(false);

        return;
      }
      setRows(data);

      setCargando(false);
    } catch (error) {
      console.error("Error al obtener las ots:", error);
    }
  };
  const fetchOtsMonth = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}ot/time/mes`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (data.length === 0) {
        alert("No hay ots en este mes");
        setCargando(false);
        return;
      }
      setRows(data);

      setCargando(false);
    } catch (error) {
      console.error("Error al obtener las ots:", error);
    }
  };

  return (
    <>
      <MainWidget
        rows={rows}
        fetchOtsDay={fetchOtsDay}
        fetchOtsWeek={fetchOtsWeek}
        fetchOtsMonth={fetchOtsMonth}
        setFiltroEstado={setFiltroEstado}
        filtroEstado={filtroEstado}
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
