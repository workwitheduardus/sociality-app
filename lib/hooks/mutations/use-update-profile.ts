"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meApi } from "@/lib/endpoints/me";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => meApi.update(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["me", "profile"], updatedUser);
    },
  });
}
