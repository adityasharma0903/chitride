import { clearSession } from "./auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

let refreshPromise: Promise<boolean> | null = null;

const refreshSession = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.ok)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
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
    const shouldTryRefresh =
      response.status === 401 &&
      !didRetry &&
      path !== "/auth/refresh" &&
      !path.startsWith("/auth/login") &&
      !path.startsWith("/auth/signup");

    if (shouldTryRefresh) {
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
