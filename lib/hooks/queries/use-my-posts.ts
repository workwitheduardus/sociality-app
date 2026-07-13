"use client";

import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/lib/endpoints/me";

export function useMyPosts() {
  return useQuery({
    queryKey: ["me", "posts"],
    queryFn: () => meApi.posts({ page: 1, limit: 9 }),
  });
}
