import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, Typography } from "@mui/material";
import accessibility from "highcharts/modules/accessibility";
const GraficaGastos = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = chartRef.current.chart;
      chart.update({});
    }
  }, [data]);

  if (!data || data.length === 0) {
    return <Typography>No hay datos</Typography>;
  }
  accessibility(Highcharts);
  const totalGastos = data
    .filter((item) => item.tipo === "Gasto")
    .reduce((total, item) => total + parseFloat(item.cantidad), 0)
    .toFixed(2);

  const totalIngresos = data
    .filter((item) => item.tipo === "Ingreso")
    .reduce((total, item) => total + parseFloat(item.cantidad), 0)
    .toFixed(2);

  const diferencia = +totalIngresos - +totalGastos;
  const diferenciaLabel = diferencia >= 0 ? "Ganancias" : "Pérdidas";

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Total de Gastos e Ingresos",
    },
    xAxis: {
      categories: [diferenciaLabel],
      title: {
        text: `Total ${diferencia.toFixed(2)}€`,
      },
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
        data: [
          {
            y: Number(totalGastos),
            dataLabels: {
              enabled: true,
            },
          },
        ],
        color: "red",
      },
      {
        name: "Ingresos",
        data: [
          {
            y: Number(totalIngresos),
            dataLabels: {
              enabled: true,
            },
          },
        ],
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
