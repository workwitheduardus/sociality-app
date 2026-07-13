"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { commentsApi } from "@/lib/endpoints/comments";

export function useComments(postId: number, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) =>
      commentsApi.list(postId, { page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    enabled,
  });
}
