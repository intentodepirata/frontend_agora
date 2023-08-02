import axios from "axios";

const user = JSON.parse(sessionStorage.getItem("user"));

const customers = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});

export const getCustomers = async () => {
  try {
    const res = await customers.get("cliente");
    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
export const createCustomer = async (data) => {
  try {
    const res = await customers.post("cliente", data);
    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchClientes = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}cliente/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchDelete = async ([id], token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
