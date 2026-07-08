"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface HeaderSearchProps {
  variant?: "desktop" | "mobile";
  onClose?: () => void;
}

export function HeaderSearch({
  variant = "desktop",
  onClose,
}: HeaderSearchProps) {
  const [query, setQuery] = useState("");

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-4 px-4 h-16 bg-black border-b border-gray-900">
        <div className="flex flex-1 items-center gap-1.5 rounded-full border border-gray-900 bg-gray-950 px-3 py-2">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
            autoFocus
          />
        </div>
        <button onClick={onClose} aria-label="Close search">
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-[491px] items-center gap-1.5 rounded-full border border-gray-900 bg-gray-950 px-4 py-2">
      <Search className="h-5 w-5 text-gray-500" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
      />
    </div>
  );
}
