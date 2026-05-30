const rawBackendUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
const backendUrl = rawBackendUrl.replace(/\/+$/, "");

export const API_BASE = `${backendUrl}/api`;
export const BACKEND_BASE = backendUrl;
