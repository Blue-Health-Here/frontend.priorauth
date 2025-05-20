
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://172.212.86.131:8060"
  },
});

export const axiosAdmin: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true"
  },
});

// Attach token
axiosAdmin.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // @ts-ignore
    const user: any | null = JSON.parse(localStorage?.getItem("user"));
    if (!user?.token) {
      return Promise.reject(new Error("Unauthorized: No token found"));
    }
    config.headers.Authorization = `Bearer ${user?.token}`;
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Catch 401 and log out
axiosAdmin.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default api;
