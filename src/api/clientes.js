export async function obtenerClientes() {
  //VITE TRAE SU PROPIO SISTEMA DE VARIABLES DE ENTORNO
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
export async function obtenerCliente(id) {
  //VITE TRAE SU PROPIO SISTEMA DE VARIABLES DE ENTORNO
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
}
export async function addClientes(datos) {
  console.log(datos);
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}
export async function updateCliente(id, datos) {
  console.log(datos);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCliente(id) {
  console.log(id);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}
