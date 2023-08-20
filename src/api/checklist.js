import axios from "axios";

const checklistApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}checklist`,
});

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const findChecklist = (id, token) =>
  checklistApi.get(`/${id}`, createHeaders(token));

export const addChecklist = (checklist, token) =>
  checklistApi.post("/create", checklist, createHeaders(token));

export const deleteChecklist = (id, token) =>
  checklistApi.delete(`/${id}`, createHeaders(token));

export const updateChecklist = (id, checklist, token) =>
  checklistApi.put(`/edit/${id}`, checklist, createHeaders(token));
