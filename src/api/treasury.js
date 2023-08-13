import axios from "axios";

const treasuryApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}tesoreria`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getStatus = (token) =>
  treasuryApi.get("/status", createHeaders(token));

export const postStatus = (data, token) =>
  treasuryApi.post("/", data, createHeaders(token));
