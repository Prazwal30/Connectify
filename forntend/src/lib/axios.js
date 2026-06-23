import axios from "axios";

const API_HOST = window.location.hostname || "localhost";
const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL || (import.meta.env.PROD ? "/api" : `http://${API_HOST}:3001/api`),
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("connectify-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
