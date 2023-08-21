import axios from "axios";

const componentsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}components`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getProducts = (token) =>
  componentsApi.get("/", createHeaders(token));

export const findProduct = (id, token) =>
  componentsApi.get(`/${id}`, createHeaders(token));

export const findProductsModel = (id, token) =>
  componentsApi.get(`/models/${id}`, createHeaders(token));

export const addProduct = (product, token) =>
  componentsApi.post("/create", product, createHeaders(token));

export const updateProduct = (id, product, token) =>
  componentsApi.put(`/${id}`, product, createHeaders(token));

export const deleteProduct = (id, token) =>
  componentsApi.delete(`/${id}`, createHeaders(token));
