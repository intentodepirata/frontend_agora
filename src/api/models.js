import axios from "axios";

const modelsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}models`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getModels = (token) => modelsApi.get("/", createHeaders(token));

export const findModels = (id, token) =>
  modelsApi.get(`/${id}`, createHeaders(token));

export const findBrandModels = (id, token) =>
  modelsApi.get(`/brand/${id}`, createHeaders(token));

export const addModels = (brand, token) =>
  modelsApi.post("/create", brand, createHeaders(token));

export const deleteModels = (id, token) =>
  modelsApi.delete(`/${id}`, createHeaders(token));

export const updateModels = (id, brand, token) =>
  modelsApi.put(`/edit/${id}`, brand, createHeaders(token));
