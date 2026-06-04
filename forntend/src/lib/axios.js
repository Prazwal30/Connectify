import axios from "axios";

const API_HOST = window.location.hostname || "localhost";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : `http://${API_HOST}:3001/api`,
  withCredentials: true,
});
