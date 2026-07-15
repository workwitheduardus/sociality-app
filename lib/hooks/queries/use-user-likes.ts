"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/endpoints/users";

export function useUserLikes(username: string, enabled: boolean) {
  return useQuery({
    queryKey: ["users", username, "likes"],
    queryFn: () => usersApi.likes(username, { page: 1, limit: 9 }),
    enabled,
  });
}
