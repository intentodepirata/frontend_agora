import axios from "axios";

const operationsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}operacion`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const findOperations = (orderId, token) =>
  operationsApi.get(`/${orderId}`, createHeaders(token));

export const addOperation = (operation, token) =>
  operationsApi.post("/", operation, createHeaders(token));

export const deleteOperation = (id, token) =>
  operationsApi.delete(`/${id}`, createHeaders(token));
