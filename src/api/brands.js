import axios from "axios";

const brandsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}marca`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getBrands = (token) => brandsApi.get("/", createHeaders(token));

export const findBrand = (id, token) =>
  brandsApi.get(`/${id}`, createHeaders(token));

export const findBrandModels = (id, token) =>
  brandsApi.get(`/modelo/${id}`, createHeaders(token));

export const addBrand = (brand, token) =>
  brandsApi.post("/", brand, createHeaders(token));

export const deleteBrand = (id, token) =>
  brandsApi.delete(`/${id}`, createHeaders(token));

export const updateBrand = (id, brand, token) =>
  brandsApi.put(`/${id}`, brand, createHeaders(token));
