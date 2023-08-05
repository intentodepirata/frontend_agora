import axios from "axios";

const ordersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}ot`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getOrders = (token) => ordersApi.get("/", createHeaders(token));

export const getOrdersByTime = (time, token) =>
  ordersApi.get(`/time/${time}`, createHeaders(token));

export const getOrdersPriceByTime = (time, token) =>
  ordersApi.get(`/total-price/${time}`, createHeaders(token));

export const findOrderByQuery = (query, token) =>
  ordersApi.get(`/search/${query}`, createHeaders(token));

export const findOrder = (id, token) =>
  ordersApi.get(`/${id}`, createHeaders(token));

export const findOrderToPrint = (id, token) =>
  ordersApi.get(`/print/${id}`, createHeaders(token));

export const findOrderStatus = (id, token) =>
  ordersApi.get(`/status/${id}`, createHeaders(token));

export const findOrderPrice = (id, token) =>
  ordersApi.get(`/price/${id}`, createHeaders(token));

export const addOrder = (order, token) =>
  ordersApi.post("/", order, createHeaders(token));

export const updateOrder = (id, token) =>
  ordersApi.put(`/${id}`, createHeaders(token));

//Los comandos put siempre llevan un body, por eso le ponemos null
export const updateOrderDeliver = (id, token) =>
  ordersApi.put(`/deliver/${id}`, null, createHeaders(token));

export const deleteOrder = (id, token) =>
  ordersApi.delete(`/${id}`, createHeaders(token));
