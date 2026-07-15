"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/endpoints/users";

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ["users", username, "profile"],
    queryFn: () => usersApi.getByUsername(username),
  });
}
