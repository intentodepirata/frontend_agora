import axios from "axios";

const statesApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}estado`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getStates = (token) => statesApi.get("/", createHeaders(token));

export const findState = (id, token) =>
  statesApi.get(`/${id}`, createHeaders(token));

export const addState = (state, token) =>
  statesApi.post("/", state, createHeaders(token));

export const deleteState = (id, token) =>
  statesApi.delete(`/${id}`, createHeaders(token));

export const updateState = (id, state, token) =>
  statesApi.put(`/${id}`, state, createHeaders(token));
