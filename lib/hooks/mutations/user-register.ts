"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/endpoints/auth";
import { setToken } from "@/lib/auth-storage";
import { RegisterFormValues } from "@/schemas/auth.schema";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormValues) => {
      const { confirmPassword, ...payload } = data;
      return authApi.register(payload);
    },
    onSuccess: (response) => {
      setToken(response.token);
      router.push("/feed");
    },
  });
}
