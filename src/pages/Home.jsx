import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import TablaHome from "../components/TablaHome/TablaHome";
import MainWidget from "../components/MainWidget/MainWidget";
import { useUserContext } from "../contexts/UserContext";

const Home = () => {
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    const fetchOts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}ot/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        setRows(data);
      } catch (error) {
        console.error("Error al obtener las ots:", error);
      }
    };
    fetchOts();
  }, []);
  return (
    <>
      <MainWidget />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaHome rows={rows} />
      </Box>
    </>
  );
};

export default Home;
