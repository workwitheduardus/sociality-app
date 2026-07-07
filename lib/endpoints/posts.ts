import { api, buildQuery } from "../api-client";
import { Post, PaginatedResponse, PaginationParams } from "@/app/types/api";

export const postsApi = {
  list: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(`/api/posts${buildQuery(params)}`),

  get: (id: number) => api.get<Post>(`/api/posts/${id}`),

  create: (data: { image: File; caption?: string }) => {
    const form = new FormData();
    form.append("image", data.image);
    if (data.caption) form.append("caption", data.caption);
    return api.post<Post>("/api/posts", form);
  },

  delete: (id: number) => api.delete<void>(`/api/posts/${id}`),
};
