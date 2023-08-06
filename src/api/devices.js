import axios from "axios";

const devicesApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}dispositivo`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getDevices = (token) => ordersApi.get("/", createHeaders(token));

export const findDeviceByOrderId = (orderId, token) =>
  devicesApi.get(`/ot/${orderId}`, createHeaders(token));

export const addDevice = (values, token) =>
  devicesApi.post("/", values, createHeaders(token));
