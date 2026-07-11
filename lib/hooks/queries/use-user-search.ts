"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/endpoints/users";

export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: () => usersApi.search(query, { page: 1, limit: 20 }),
    enabled: query.trim().length > 0,
  });
}
