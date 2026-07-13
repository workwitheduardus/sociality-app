"use client";

import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/lib/endpoints/me";

export function useMySaved(enabled: boolean) {
  return useQuery({
    queryKey: ["me", "saved"],
    queryFn: () => meApi.saved({ page: 1, limit: 9 }),
    enabled,
  });
}
