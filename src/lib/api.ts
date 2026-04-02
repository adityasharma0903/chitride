import { clearSession } from "./auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const refreshSession = async () => {
  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return response.ok;
};

export const apiRequest = async <T>(
  path: string,
  init: RequestInit = {},
  didRetry = false
): Promise<T> => {
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && !didRetry && path !== "/auth/refresh") {
      const refreshed = await refreshSession();
      if (refreshed) {
        return apiRequest<T>(path, init, true);
      }
    }

    if (response.status === 401) {
      clearSession();
    }
    throw new ApiError(data.message || "Request failed", response.status);
  }

  return data as T;
};
