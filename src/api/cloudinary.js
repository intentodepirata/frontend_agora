import axios from "axios";
const cloudinaryApi = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_URL,
});

export const uploadImage = (body) => cloudinaryApi.post("", body);
