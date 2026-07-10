"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { feedApi } from "@/lib/endpoints/feed";
import { queryKeys } from "@/lib/query-key";

export function useFeed() {
  return useInfiniteQuery({
    queryKey: queryKeys.feed,
    queryFn: ({ pageParam = 1 }) => feedApi.get({ page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });
}
