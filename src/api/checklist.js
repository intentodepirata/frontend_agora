import axios from "axios";

const checklistApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}checklist`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getChecklists = (token) =>
  checklistApi.get("/", createHeaders(token));

export const findChecklist = (id, token) =>
  checklistApi.get(`/${id}`, createHeaders(token));

export const addChecklist = (checklist, token) =>
  checklistApi.post("/", checklist, createHeaders(token));

export const deleteBrand = (id, token) =>
  checklistApi.delete(`/${id}`, createHeaders(token));

export const updateChecklist = (id, checklist, token) =>
  checklistApi.put(`/${id}`, checklist, createHeaders(token));
