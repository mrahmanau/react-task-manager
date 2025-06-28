import axios from "axios";
import { getCurrentLoggedInUser } from "../services/authService";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getCurrentLoggedInUser();

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
