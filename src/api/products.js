import axios from "axios";

const productsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}componente`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getProducts = (token) =>
  productsApi.get("/", createHeaders(token));

export const findProduct = (id, token) =>
  productsApi.get(`/${id}`, createHeaders(token));

export const findProductWithModel = (id, token) =>
  productsApi.get(`/modelo/${id}`, createHeaders(token));

export const addProduct = (product, token) =>
  productsApi.post("/", product, createHeaders(token));

export const updateProduct = (id, product, token) =>
  productsApi.put(`/${id}`, product, createHeaders(token));

export const deleteProduct = (id, token) =>
  productsApi.delete(`/${id}`, createHeaders(token));
