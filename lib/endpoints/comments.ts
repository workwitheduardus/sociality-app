import { api, buildQuery } from "../api-client";
import { Comment, PaginatedResponse, PaginationParams } from "@/app/types/api";

export const commentsApi = {
  list: (postId: number, params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Comment>>(
      `/api/posts/${postId}/comments${buildQuery(params)}`,
    ),

  create: (postId: number, text: string) =>
    api.post<Comment>(`/api/posts/${postId}/comments`, { text }),

  delete: (id: number) => api.delete<void>(`/api/comments/${id}`),
};
