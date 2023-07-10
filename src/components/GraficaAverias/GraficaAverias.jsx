import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Typography } from "@mui/material";
import accessibility from "highcharts/modules/accessibility";

const GraficaReparaciones = ({ data }) => {
  const chartRef = useRef(null);
  accessibility(Highcharts);
  useEffect(() => {
    if (chartRef.current && data) {
      const chart = chartRef.current.chart;
      chart.update({});
    }
  }, [data]);

  if (!data) {
    return <Typography>No hay datos</Typography>;
  }
  const modelos = data.map((item) => item.modelo);

  const series = data.map((item) => ({
    name: `${item.modelo} - ${item.averia}`,
    data: [item.total_reparaciones],
  }));

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Top 5 Modelos Más Reparados",
    },
    xAxis: {
      categories: modelos,
      title: {
        text: "Ganador",
      },
    },
    yAxis: {
      title: {
        text: "Total de Reparaciones",
      },
      labels: {
        format: "{value}",
      },
      tickInterval: 1,
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },

    series: series,
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
