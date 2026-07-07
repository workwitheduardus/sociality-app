import { api } from "../api-client";

export const followApi = {
  follow: (username: string) =>
    api.post<{ following: true }>(`/api/follow/${username}`),

  unfollow: (username: string) =>
    api.delete<{ following: false }>(`/api/follow/${username}`),
};
