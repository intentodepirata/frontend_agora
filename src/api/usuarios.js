export async function addUser(datos) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}user/register`,
      {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" },
      }
    );
    await response.json();
  } catch (error) {
    console.log(error);
  }
}
export async function login(datos) {
  console.log(datos);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: "POST",
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
