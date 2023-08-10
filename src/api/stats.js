import axios from "axios";

const statsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}estadisticas`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const generateStats = (rangeDates, token) =>
  statsApi.post("/", rangeDates, createHeaders(token));
