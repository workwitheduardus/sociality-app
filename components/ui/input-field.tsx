"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, isPassword, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex w-full flex-col gap-0.5">
        <label className="text-sm font-bold text-white">{label}</label>
        <div
          className={`flex h-12 w-full items-center gap-2 rounded-xl border bg-gray-950 px-4 ${error ? "border-error-700" : "border-gray-900"
          }`}
        >
          <input
            ref={ref}
            type={inputType}
            className="flex-1 bg-transparent text-md text-white placeholder:text-gray-600 outline-none"
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm font-medium tracking-[-0.03em] text-error-700">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
