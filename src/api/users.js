import axios from "axios";

const usersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}users`,
});
const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const addUser = (user) => usersApi.post(`/register`, user);

export const updateUser = (user, token) =>
  usersApi.put("/edit", user, createHeaders(token));

export const updateUserPassword = (password, token) =>
  usersApi.put("/password/update", password, createHeaders(token));

export const validateUser = (confirmationToken) =>
  usersApi.get(`/confirm/${confirmationToken}`, supplier);

export const forgotPassword = (email) => usersApi.post("/forgot", email);

export const resetPassword = (resetToken, password) =>
  usersApi.post(`/reset/${resetToken}`, password);

export const updateSubscription = (values, token) =>
  usersApi.post("/payments/update", values, createHeaders(token));

export const getExpirationDate = (id) => usersApi.get(`/fecha/${id}`);

export const getEmployees = (id) => usersApi.get(`/employees/${id}`);

export const deleteEmployee = (id) => usersApi.delete(`/employees/${id}`);
