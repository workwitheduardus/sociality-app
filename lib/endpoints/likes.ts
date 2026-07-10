import { api, buildQuery } from "../api-client";
import { User, PaginatedResponse, PaginationParams } from "@/app/types/api";

export const likesApi = {
  like: (postId: number) =>
    api.post<{ liked: boolean }>(`/api/posts/${postId}/like`),

  unlike: (postId: number) =>
    api.delete<{ liked: boolean }>(`/api/posts/${postId}/like`),

  listLikers: (postId: number, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<User>>(
      `/api/posts/${postId}/likes${buildQuery(params)}`,
    ),
};
