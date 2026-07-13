"use client";

import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/lib/endpoints/me";

export function useMyProfile() {
  return useQuery({
    queryKey: ["me", "profile"],
    queryFn: () => meApi.get(),
  });
}
