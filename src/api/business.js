import axios from "axios";
const businessApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}business`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const findBusiness = (token) =>
  businessApi.get("/", createHeaders(token));

export const addBusiness = (values, token) =>
  businessApi.post("/create", values, createHeaders(token));

export const updateBusiness = (id, values, token) =>
  businessApi.put(`/${id}`, values, createHeaders(token));

export const updateBusinessPolicy = (values, token) =>
  businessApi.put("/policy/update", values, createHeaders(token));

export const updateImage = (id, values, token) =>
  businessApi.put(`/image/${id}`, values, createHeaders(token));

export const deleteImage = (negocioId, token) =>
  businessApi.delete(`/delete-logo/${negocioId}`, createHeaders(token));
