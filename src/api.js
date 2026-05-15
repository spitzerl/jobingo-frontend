import axios from "axios";

// Support both build-time (VITE_) and runtime (window.__CONFIG__.apiUrl) configuration
// Runtime injection allows image reuse across environments without rebuild
const getApiUrl = () => {
  // 1. Check for runtime-injected URL (from public/config.json)
  if (window.__CONFIG__?.apiUrl) {
    return window.__CONFIG__.apiUrl;
  }
  // 2. Check for build-time Vite env (dev only)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // 3. Fallback
  return "http://localhost:3000/api";
};

const api = axios.create({
  baseURL: getApiUrl(),
});

// Ajout du token si existant dans le stockage local
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
