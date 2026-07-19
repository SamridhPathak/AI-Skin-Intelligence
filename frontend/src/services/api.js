import axios from "axios";

// One axios instance per backend service (matches your current
// auth_service :8001 / profile_service :8002 split). Both attach the
// JWT automatically via the interceptor below, so individual service
// files never need to read localStorage or set headers themselves.
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL || "http://127.0.0.1:8001",
});

export const profileApi = axios.create({
  baseURL: import.meta.env.VITE_PROFILE_API_URL || "http://127.0.0.1:8002",
});

function attachToken(config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

authApi.interceptors.request.use(attachToken);
profileApi.interceptors.request.use(attachToken);

// Default export kept for backwards compatibility with existing imports.
export default authApi;
