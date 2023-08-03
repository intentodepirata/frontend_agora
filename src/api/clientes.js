import axios from "axios";

const getToken = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user?.token ? `Bearer ${user?.token}` : undefined;
};

const customersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}cliente/`,
  headers: {
    Authorization: getToken(),
  },
});

export const getCustomers = () => customersApi.get();
export const findCustomer = (id) => customersApi.get(`${id}`);
export const addCustomer = (customer) => customersApi.post(customer);
export const deleteCustomer = (id) => customersApi.delete(`${id}`);
export const updateCustomer = (id, customer) =>
  customersApi.put(`${id}`, customer);

// export const deleteCustomer = async (id) => {
//   try {
//     const res = await customersApi.delete("/", id);
//     return res.data;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// export const fetchClientes = async (token) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}cliente/`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return await res.json();
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// export const fetchDelete = async ([id], token) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     });

//     return await res.json();
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };
