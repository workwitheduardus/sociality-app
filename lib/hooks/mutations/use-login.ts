"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/lib/endpoints/auth";
import { setToken } from "@/lib/auth-storage";
import { LoginFormValues } from "@/schemas/auth.schema";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (data: LoginFormValues) => authApi.login(data),
    onSuccess: (response) => {
      setToken(response.token);
      const returnTo = searchParams.get("returnTo") || "/feed";
      router.push(returnTo);
    },
  });
}
