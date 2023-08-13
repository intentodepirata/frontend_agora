import axios from "axios";

const servicesApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}servicios`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getServices = (token) =>
  servicesApi.get("/", createHeaders(token));

export const findService = (id, token) =>
  servicesApi.get(`/${id}`, createHeaders(token));

export const addService = (supplier, token) =>
  servicesApi.post("/", supplier, createHeaders(token));

export const updateService = (id, supplier, token) =>
  servicesApi.put(`/${id}`, supplier, createHeaders(token));

export const deleteService = (id, token) =>
  servicesApi.delete(`/${id}`, createHeaders(token));
