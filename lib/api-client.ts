import { getToken, setToken, clearToken} from "./auth-storage";
import { ApiError, PaginationParams } from "@/app/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClientError extends Error {
  constructor(
    public status: number,
    public body: ApiError,
  ) {
    super(body.message);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      const returnTo = window.location.pathname;
      window.location.href = `/login?returnTo=${encodeURIComponent(returnTo)}`;
    }
  }

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiClientError(res.status, body);
  }

  return body as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),
  patch: <T>(path: string, body: FormData | unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

function buildQuery(params: PaginationParams & Record<string, unknown>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) q.set(k, String(v));
  });
  const str = q.toString();
  return str ? `?${str}` : "";
}
