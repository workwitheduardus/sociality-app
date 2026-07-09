"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { InputField } from "@/components/ui/input-field";
import { useRegister } from "@/lib/hooks/mutations/user-register";
import { ApiClientError } from "@/lib/api-client";

export function RegisterForm() {
  const register = useRegister();
  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    register.mutate(data, {
      onError: (error) => {
        if (error instanceof ApiClientError && error.body.errors) {
          Object.entries(error.body.errors).forEach(([field, messages]) => {
            setError(field as keyof RegisterFormValues, {
              message: messages[0],
            });
          });
        }
      },
    });
  };

  const generalError =
    register.isError &&
    !(register.error instanceof ApiClientError && register.error.body.errors)
      ? "Something went wrong. Please try again."
      : undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <InputField
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...registerField("name")}
      />
      <InputField
        label="Username"
        placeholder="Enter your username"
        error={errors.username?.message}
        {...registerField("username")}
      />
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message || generalError}
        {...registerField("email")}
      />
      <InputField
        label="Number Phone"
        type="tel"
        placeholder="Enter your number phone"
        error={errors.phone?.message}
        {...registerField("phone")}
      />
      <InputField
        label="Password"
        isPassword
        placeholder="Enter your password"
        error={errors.password?.message}
        {...registerField("password")}
      />
      <InputField
        label="Confirm Password"
        isPassword
        placeholder="Enter your confirm password"
        error={errors.confirmPassword?.message}
        {...registerField("confirmPassword")}
      />
      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={register.isPending}
          className="flex h-11 w-full items-center justify-center rounded-full bg-brand-600 text-md font-bold text-white disabled:opacity-60 md:h-12"
        >
          {register.isPending ? "Submitting..." : "Submit"}
        </button>
        <p className="text-sm font-semibold text-white md:text-md">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-500">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
