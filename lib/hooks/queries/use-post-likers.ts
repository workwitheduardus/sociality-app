"use client";

import { useQuery } from "@tanstack/react-query";
import { likesApi } from "@/lib/endpoints/likes";
import { queryKeys } from "@/lib/query-key";

export function usePostLikers(postId: number, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.postLikers(postId),
    queryFn: () => likesApi.listLikers(postId, { page: 1, limit: 20 }),
    enabled,
  });
}
