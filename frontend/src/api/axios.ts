// src/api/axios.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // send cookies (refresh token)
});

// Request interceptor: attach token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: if backend sends new access token, update it
API.interceptors.response.use(
  (response) => {
    // ✅ if backend set a new access token in headers, update it
    const newAccessToken = response.headers["x-access-token"];
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    return response;
  },
  async (error) => {
    // if unauthorized and no refresh possible, clear token
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
