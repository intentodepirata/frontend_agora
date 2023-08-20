import axios from "axios";

const statsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}orders`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const generateStats = (rangeDates, token) =>
  statsApi.post("/stats", rangeDates, createHeaders(token));
