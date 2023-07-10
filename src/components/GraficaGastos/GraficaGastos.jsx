import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress } from "@mui/material";

const GraficaGastos = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = chartRef.current.chart;

      chart.update({});
    }
  }, [data]);
  if (!data) {
    return <CircularProgress sx={{ textAlign: "center" }} />;
  }

  const categories = data
    .map((item) => {
      const date = new Date(item.fecha);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${day}/${month}`;
    })
    .filter((item, index, array) => array.indexOf(item) === index);

  const gastos = data
    .filter((item) => item.tipo === "Gasto")
    .map((item) => parseFloat(item.cantidad));

  const ingresos = data
    .filter((item) => item.tipo === "Ingreso")
    .map((item) => parseFloat(item.cantidad));

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Gastos e Ingresos",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: "Total €",
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
    series: [
      {
        name: "Gastos",
        data: gastos,
        color: "red",
      },
      {
        name: "Ingresos",
        data: ingresos,
        color: "green",
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default GraficaGastos;
