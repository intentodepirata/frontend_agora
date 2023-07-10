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
    return <CircularProgress />;
  }

  const totalGastos = data
    .filter((item) => item.tipo === "Gasto")
    .reduce((total, item) => total + parseFloat(item.cantidad), 0);

  const totalIngresos = data
    .filter((item) => item.tipo === "Ingreso")
    .reduce((total, item) => total + parseFloat(item.cantidad), 0);

  const diferencia = totalIngresos - totalGastos;
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
        text: `Total ${diferencia}€`,
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
    series: [
      {
        name: "Gastos",
        data: [
          {
            y: totalGastos,
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
            y: totalIngresos,
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