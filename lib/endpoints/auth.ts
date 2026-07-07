import { api } from "../api-client";
import { AuthResponse } from "@/app/types/api";

export const authApi = {
  register: (data: {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }) => api.post<AuthResponse>("/api/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/api/auth/login", data),
};
