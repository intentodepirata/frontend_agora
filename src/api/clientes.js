import axios from "axios";

const customersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}cliente`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getCustomers = (token) =>
  customersApi.get("/", createHeaders(token));

export const findCustomer = (id, token) =>
  customersApi.get(`/${id}`, createHeaders(token));

export const addCustomer = (customer, token) =>
  customersApi.post("/", customer, createHeaders(token));

export const deleteCustomer = (id, token) =>
  customersApi.delete(`/${id}`, createHeaders(token));

export const updateCustomer = (id, customer, token) =>
  customersApi.put(`/${id}`, customer, createHeaders(token));
