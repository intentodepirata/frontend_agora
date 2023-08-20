import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TablaHome from "../components/TablaHome/TablaHome";
import MainWidget from "../components/MainWidget/MainWidget";
import { useUserContext } from "../contexts/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import useScrollUp from "../hooks/useScrollUp";
import {
  deleteOrder,
  getOrdersByTime,
  updateOrderDeliver,
} from "../api/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TIME } from "../components/MainWidget/utils/constantes";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [opcionesFiltro, setOpcionesFiltro] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [totalFacturado, setTotalFacturado] = useState(0);
  const [time, setTime] = useState(TIME.MES);
  const queryClient = useQueryClient();
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

  const queryOrdersHome = useQuery({
    queryKey: ["orders-home", time],
    queryFn: () => getOrdersByTime(time, user.token),
    onSuccess: (data) => {
      setRows(
        data.data.orders.map((order) => ({
          id: order.id,
          otNumber: order.otNumber,
          brands: order.device.models.brands.nombre,
          modelo: order.device.models.nombre,
          imei: order.device.imei,
          cliente: order.customer.nombre,
          telefono: order.customer.telefono,
          dni: order.customer.dni,
          estado: order.state.estado,
          tipoGarantia: order.tipoGarantia,
          fechaEntrada: new Date(order.createdAt).toLocaleString("es-ES", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
          entregada: order.entregada,
        }))
      );
      setTotalFacturado(data.data.total);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const deliverMutation = useMutation({
    mutationFn: (id) => updateOrderDeliver(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden entregada correctamente", {
        variant: "success",
      });

      queryClient.invalidateQueries(["orders-home", time]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteOrder(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Orden eliminada correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders-home", time]);
    },
  });

  return (
    <>
      <MainWidget
        rows={rows}
        setTime={setTime}
        setFiltroEstado={setFiltroEstado}
        filtroEstado={filtroEstado}
        totalFacturado={totalFacturado}
      />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <TablaHome
          rows={rows}
          cargando={queryOrdersHome.isFetching}
          opcionesFiltro={opcionesFiltro}
          deliverMutation={deliverMutation}
          deleteMutation={deleteMutation}
        />
      </Box>
    </>
  );
};

export default Home;
