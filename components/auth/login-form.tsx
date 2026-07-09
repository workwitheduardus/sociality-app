"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import { InputField } from "@/components/ui/input-field";
import { useLogin } from "@/lib/hooks/mutations/use-login";
import { ApiClientError } from "@/lib/api-client";

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data);
  };

   const apiErrorMessage = login.isError
     ? login.error instanceof ApiClientError && login.error.status === 401
       ? "Incorrect email or password"
       : "Something went wrong. Please try again."
     : undefined;


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message || apiErrorMessage}
        {...register("email")}
      />
      <InputField
        label="Password"
        isPassword
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />
      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={login.isPending}
          className="flex h-11 w-full items-center justify-center rounded-full bg-brand-600 text-md font-bold text-white disabled:opacity-60 md:h-12"
        >
          {login.isPending ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm font-semibold text-white md:text-md">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-brand-500">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
