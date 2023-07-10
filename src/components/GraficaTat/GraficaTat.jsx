import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Typography } from "@mui/material";

const GraficaReparaciones = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = chartRef.current.chart;
      chart.update({});
    }
  }, [data]);

  if (!data) {
    return <Typography>No hay datos</Typography>;
  }

  const otIds = data.map((item) => `OT${item.id}`);
  const tiempoTranscurrido = data.map((item) => item.Tats);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "TAT (Tiempo de ejecución) en dias ",
    },
    xAxis: {
      categories: otIds,
      title: {
        text: "Orden de Trabajo",
      },
    },
    yAxis: {
      title: {
        text: "Tiempo Transcurrido (días)",
      },
      min: 0,
      allowDecimals: false,
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
    tooltip: {
      formatter: function () {
        const index = this.point.index;
        const imei = data[index].imei;
        const modelo = data[index].modelo;
        return `<b>${this.x}</b><br/>Tiempo Transcurrido: ${this.y} días<br/>IMEI: ${imei}<br/>Modelo: ${modelo}`;
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Tiempo Transcurrido",
        data: tiempoTranscurrido,
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

export default GraficaReparaciones;
