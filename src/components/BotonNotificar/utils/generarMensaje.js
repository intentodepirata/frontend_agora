export const options = ["Avisar Whatsapp", "Avisar Email"];
export const generarMensaje = (cliente, user, email) => {
  console.log(cliente);
  const enlace = `${import.meta.env.VITE_URL}order-status/${cliente.uuid}`;
  const {
    cliente: clienteName,
    estado,
    marca,
    modelo,
    imei,
    color,
    averiaDetectadaSat,
    descripcionDetectadaSat,
    observacionesDetectadasSat,
    tipoGarantia,
    precio,
  } = cliente;

  return !email
    ? `¡Hola *${clienteName}*!

    Su reparación ha cambiado de estado a: *${estado}*.
    *Datos del terminal:* ${marca}, ${modelo}, ${imei}, color: ${color}.
    *Averia principal:* ${averiaDetectadaSat}.
    *Descripcion:* ${descripcionDetectadaSat}.
    *Observaciones:* ${observacionesDetectadasSat || ""}.
    *Resolucion:* ${tipoGarantia}.
    *Precio: ${precio}.*
    
    Puede realizar un seguimiento a su reparacion en el *siguiente enlace:*
    ${enlace}
    ${
      estado == "Reparacion Finaliazada"
        ? "Su terminal está disponible para recogida en:"
        : ""
    }
    Un saludo desde *${user.negocio.nombre}*
    *Direccion:* ${user.negocio.direccion}.
    *Telefono:* ${user.negocio.telefono}.
    `
    : `¡Hola ${clienteName}!

      Su reparación ha cambiado de estado a: ${estado}.
      Datos del terminal: ${marca}, ${modelo}, ${imei}, color: ${color}.
      Averia principal: ${averiaDetectadaSat}.
      Descripcion: ${descripcionDetectadaSat}.
      Observaciones: ${observacionesDetectadasSat || ""}.
      Resolucion: ${tipoGarantia}.
      Precio: ${precio}.

      Puede realizar un seguimiento a su reparacion en el siguiente enlace:
      ${enlace}
      ${
        estado == "Reparacion Finaliazada"
          ? "Su terminal está disponible para recogida en:"
          : ""
      }
      Un saludo desde ${user.negocio.nombre}
      Direccion: ${user.negocio.direccion}.
      Telefono: ${user.negocio.telefono}.
      `;
};

export const notificarPorWhatsApp = (cliente, user) => {
  const telefono = encodeURIComponent(`+34${cliente.telefono}`);
  const mensaje = encodeURIComponent(generarMensaje(cliente, user));
  const enlace = `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
  window.open(enlace);
};

export const notificarPorEmail = (cliente, user) => {
  const email = encodeURIComponent(cliente.email);
  const asunto = encodeURIComponent(
    `${user.negocio.nombre} - ${cliente.estado}`
  );
  const cuerpo = encodeURIComponent(generarMensaje(cliente, user, true));
  const url = `mailto:${email}?subject=${asunto}&body=${cuerpo}&content-type=text/html`;
  window.open(url);
};
