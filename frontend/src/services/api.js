import axios from "axios";

// One axios instance per backend service. All attach the JWT automatically
// via the interceptor below.
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL || "http://127.0.0.1:8001",
});

export const profileApi = axios.create({
  baseURL: import.meta.env.VITE_PROFILE_API_URL || "http://127.0.0.1:8002",
});

export const assessmentApi = axios.create({
  baseURL: import.meta.env.VITE_ASSESSMENT_API_URL || "http://127.0.0.1:8003",
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
assessmentApi.interceptors.request.use(attachToken);

export default authApi;
