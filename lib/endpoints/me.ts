import { api, buildQuery } from "../api-client";
import { User, Post, PaginatedResponse, PaginationParams } from "@/app/types/api";

export const meApi = {
  get: () => api.get<User>("/api/me"),

  update: (data: FormData) => api.patch<User>("/api/me", data),

  posts: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(`/api/me/post${buildQuery(params)}`),

  likes: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(`/api/me/likes${buildQuery(params)}`),

  saved: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(`/api/me/saved${buildQuery(params)}`),

  followers: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<User>>(`/api/me/followers${buildQuery(params)}`),

  following: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<User>>(`/api/me/following${buildQuery(params)}`),
};
