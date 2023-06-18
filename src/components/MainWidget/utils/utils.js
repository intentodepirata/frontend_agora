export const initialValues = {
  chart: {
    type: "pie",
  },
  title: {
    text: "Estado de reparaciones",
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },

  series: [
    {
      data: [],
    },
  ],
};

const obtenerColorEstado = (estado) => {
  // Define  colores personalizados según los estados de reparaciones
  if (estado === "En reparacion") {
    return "#00E272";
  } else if (estado === "Por entregar") {
    return "#2CAFFE";
  } else if (estado === "Pendiente de repuesto") {
    return "#757575";
  } else if (estado === "Asignado a tecnico") {
    return "#544FC5";
  } else if (estado === "Recepcionado") {
    return "#2CAFFE";
  } else if (estado === "Reparacion Finalizada") {
    return "#0150F5";
  }
};

const today = new Date();
export const formattedDate = today.toLocaleDateString("es-ES", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

export const updateHighcharts = (rows) => {
  const estados = {};
  rows.forEach((reparacion) => {
    if (reparacion.estado in estados) {
      estados[reparacion.estado]++;
    } else {
      estados[reparacion.estado] = 1;
    }
  });

  // Calcular el porcentaje de cada estado
  const totalReparaciones = rows.length;
  const data = Object.keys(estados).map((estado) => {
    const porcentaje = (estados[estado] / totalReparaciones) * 100;
    return {
      name: estado,
      y: porcentaje,
      color: obtenerColorEstado(estado),
    };
  });
  return data;
};

export const getTotalByEstado = (estado, data) => {
  const filteredData = data.filter((item) => item.estado === estado);
  return filteredData.length;
};
