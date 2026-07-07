import { api, buildQuery } from "../api-client";
import { User, Post, PaginatedResponse, PaginationParams } from "@/app/types/api";

export const usersApi = {
  search: (q: string, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<User>>(
      `/api/users/search${buildQuery({ q, ...params })}`,
    ),

  getByUsername: (username: string) => api.get<User>(`/api/users/${username}`),

  posts: (username: string, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(
      `/api/users/${username}/post${buildQuery(params)}`,
    ),

  likes: (username: string, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(
      `/api/users/${username}/likes${buildQuery(params)}`,
    ),

  followers: (username: string, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<User>>(
      `/api/user/${username}/followers${buildQuery(params)}`,
    ),

  following: (username: string, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<User>>(
      `/api/users/${username}/following${buildQuery(params)}`,
    ),
};
