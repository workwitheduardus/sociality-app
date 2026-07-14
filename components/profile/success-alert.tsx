"use client";

import { X } from "lucide-react";

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

export function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-success-600 px-3 py-2">
      <p className="flex-1 text-sm font-semibold text-white">{message}</p>
      <button onClick={onClose} aria-label="Dismiss">
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
