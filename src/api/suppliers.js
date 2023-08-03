import axios from "axios";

const suppliersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}proveedores`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getSuppliers = (token) =>
  suppliersApi.get("/", createHeaders(token));

export const findSupplier = (id, token) =>
  suppliersApi.get(`/${id}`, createHeaders(token));

export const addSupplier = (supplier, token) =>
  suppliersApi.post("/", supplier, createHeaders(token));

export const updateSupplier = (id, supplier, token) =>
  suppliersApi.put(`/${id}`, supplier, createHeaders(token));

export const deleteSupplier = (id, token) =>
  suppliersApi.delete(`/${id}`, createHeaders(token));
