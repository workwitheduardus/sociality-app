"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/endpoints/users";

export function useUserPosts(username: string) {
  return useQuery({
    queryKey: ["users", username, "posts"],
    queryFn: () => usersApi.posts(username, { page: 1, limit: 9 }),
  });
}
