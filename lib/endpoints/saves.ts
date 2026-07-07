import { api } from "../api-client";

export const savesApi = {
  save: (postId: number) =>
    api.post<{ saved: true }>(`/api/posts/${postId}/save`),

  unsave: (postId: number) =>
    api.delete<{ saved: false }>(`/api/posts/${postId}/save`),
};
