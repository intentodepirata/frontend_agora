import axios from "axios";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}auth`,
});

export const loginUser = (auth) => authApi.post("/login", auth);
