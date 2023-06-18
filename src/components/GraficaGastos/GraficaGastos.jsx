import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { options } from "./utils/options";

const GraficaGastos = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;

      // Actualizar el gráfico con nuevos datos o configuraciones
      chart.update({
        // Aquí puedes actualizar las opciones del gráfico si es necesario
      });
    }
  }, []); // Asegúrate de ajustar las dependencias adecuadamente

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
