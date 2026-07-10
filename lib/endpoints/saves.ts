import { api } from "../api-client";

export const savesApi = {
  save: (postId: number) =>
    api.post<{ saved: boolean }>(`/api/posts/${postId}/save`),

  unsave: (postId: number) =>
    api.delete<{ saved: boolean }>(`/api/posts/${postId}/save`),
};
